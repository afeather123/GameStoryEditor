import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VariableSelectService } from '../../services/variable-select.service';
import { LoadJsonService } from '../../services/load-json.service';
import { InteractableService } from '../../services/interactable.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})
export class FileTreeComponent implements OnInit, OnDestroy {

  @ViewChild('files') files: ElementRef;
  coreData: any;
  loadSubscription: Subscription;
  requestSubscription: Subscription;

  constructor(private variableSelectService: VariableSelectService,
    private loadJsonService: LoadJsonService,
    private interactableService: InteractableService) { }

  ngOnInit() {
    this.InitializeTree();
    this.loadTree(this.interactableService.jsTreeData);
    this.loadSubscription = this.loadJsonService.getJSTreeData().subscribe((data: any) => {
      this.coreData = data;
      this.loadTree(data);
      this.interactableService.updateFileTree(data);
    });
    this.requestSubscription = this.interactableService.FileTreeLoadRequestObservable().subscribe(() => {
      this.interactableService.loadFileTree(this.objectifyTree());
    });
  }

  ngOnDestroy() {
    this.loadSubscription.unsubscribe();
    this.requestSubscription.unsubscribe();
  }

  OnCreateInteractable(newId: string) {
    this.variableSelectService.AddNewScope(newId);
    this.interactableService.addInteractable(newId);
  }

  GetJSON() {
    console.log($(this.files.nativeElement).jstree().get_json());
  }

  InitializeTree() {

    $(this.files.nativeElement).jstree({
      'contextmenu': {
        'items': this.createCustomMenu(() => {this.updateTree(); })
      },
      'types': {
        'folder': {

        },
        'file': {
          'max_children': 0,
          'icon': 'jstree-file'
        }

      },
      'core': {
        'check_callback': true,
        'data': [
          {
            'id': 'j1_1',
            'text': 'Root node',
            'icon': true,
            'li_attr': {
              'id': 'j1_1'
            },
            'a_attr': {
              'href': '#',
              'id': 'j1_1_anchor'
            },
            'state': {
              'loaded': true,
              'opened': true,
              'selected': false,
              'disabled': false
            },
            'data': {

            },
            'children': [

            ],
            'type': 'default'
          }
        ]
      },
      'plugins': [
        'contextmenu', 'types', 'dnd'
      ]
    });

    $(this.files.nativeElement).bind('before.jstree', (e, data) => {console.log(data.func); });

    $(this.files.nativeElement).on('create_node.jstree', (e, data) => {
      if (data.node.type === 'file') {
        this.OnCreateInteractable(data.node.id);
      }
    });

    $(this.files.nativeElement).on('rename_node.jstree', (e, data) => {
      if (data.node.type === 'file') {
        console.log(data.text);
      }
    });

    $(this.files.nativeElement).on('select_node.jstree', (e, data) => {
      if (data.node.type === 'file') {
        this.variableSelectService.ChangeLocalScope(data.node.id);
        this.interactableService.selectInteractable(data.node.id);
      }
    });

    $(this.files.nativeElement).on('delete_node.jstree', (e, data) => {
      this.variableSelectService.DeleteScope(data.node.id);
    });
  }

  createCustomMenu(func: Function): Function {
    const items = {
      'new': {
        'label': 'New',
        'action': false,
        'submenu': {
          'newFile': {
            'label': 'New Interactable',
            'action': function (data) {
              const inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              inst.create_node(obj, {
                'type': 'file'
              }, 'last', function (new_node) {
                try {
                  inst.edit(new_node);
                } catch (ex) {
                  setTimeout(function () {
                    inst.edit(new_node);
                  }, 0);
                }
              });
              func();
            }
          },
          'newFolder': {
            'label': 'New Folder',
            'action': function (data) {
              const inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              inst.create_node(obj, {
                'type': 'folder'
              }, 'last', function (new_node) {
                try {
                  inst.edit(new_node);
                } catch (ex) {
                  setTimeout(function () {
                    inst.edit(new_node);
                  }, 0);
                }
              });
              func();
            }
          }
        }
      },
      'rename': {
        'separator_before': false,
        'separator_after': false,
        '_disabled': false, // (this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
        'label': 'Rename',
        /*!
        "shortcut"			: 113,
        "shortcut_label"	: 'F2',
        "icon"				: "glyphicon glyphicon-leaf",
        */
        'action': function (data) {
          const inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.edit(obj);
        }
      },
      'remove': {
        'separator_before': false,
        'icon': false,
        'separator_after': false,
        '_disabled': false, // (this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
        'label': 'Delete',
        'action': function (data) {
          const inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          if (!confirm('Are you sure you want to delete this interactable?')) {return; }
          if (inst.is_selected(obj)) {
            inst.delete_node(inst.get_selected());
          } else {
            inst.delete_node(obj);
          }
        }
      },
      'ccp': {
        'separator_before': true,
        'icon': false,
        'separator_after': false,
        'label': 'Edit',
        'action': false,
        'submenu': {
          'cut': {
            'separator_before': false,
            'separator_after': false,
            'label': 'Cut',
            'action': function (data) {
              const inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              if (inst.is_selected(obj)) {
                inst.cut(inst.get_top_selected());
              } else {
                inst.cut(obj);
              }
            }
          },
          'copy': {
            'separator_before': false,
            'icon': false,
            'separator_after': false,
            'label': 'Copy',
            'action': function (data) {
              const inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              if (inst.is_selected(obj)) {
                inst.copy(inst.get_top_selected());
              } else {
                inst.copy(obj);
              }
            }
          },
          'paste': {
            'separator_before': false,
            'icon': false,
            '_disabled': function (data) {
              return !$.jstree.reference(data.reference).can_paste();
            },
            'separator_after': false,
            'label': 'Paste',
            'action': function (data) {
              const inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              inst.paste(obj);
            }
          }
        }
      }
    };

    const menu = (node) => {
      const contextMenu = items;
      if (node.type === 'file') {
        delete contextMenu.new;
      }
      return contextMenu;
    };
    return menu;
  }

  loadTree(data: any) {
    if (data !== null && data !== undefined) {
      $(this.files.nativeElement).jstree(true).settings.core.data = data;
      $(this.files.nativeElement).jstree('refresh');
    }
  }

  objectifyTree(): any {
    const treeData = $(this.files.nativeElement).jstree().get_json('#',
    {no_state: true, no_data: true, no_li_attr: true, no_a_attr: true, flat: true});
    console.log(treeData);
    return treeData;
  }

  updateTree() {
    this.interactableService.updateFileTree(this.objectifyTree());
  }
}
