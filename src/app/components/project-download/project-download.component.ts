import { Component, OnInit } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { VariableSelectService } from '../../services/variable-select.service';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-project-download',
  templateUrl: './project-download.component.html',
  styleUrls: ['./project-download.component.css']
})
export class ProjectDownloadComponent implements OnInit {

  interactableData: any;
  variableData: any;
  sentRequest = false;

  constructor(private interactableService: InteractableService,
  private variableSelectService: VariableSelectService,
  private downloadService: DownloadService
  ) { }

  ngOnInit() {
    this.interactableService.JSTreeLoadObservable().subscribe((fileTree: any) => {
      if (this.sentRequest) {
        this.RecieveFileTreeData(fileTree);
      }
    });
  }

  DownloadProject() {
    this.sentRequest = true;
    this.interactableData = this.interactableService.stringifyInteractables();
    this.variableData = this.variableSelectService.stringifyVariables();
    this.interactableService.requestFileTree();
  }

  RecieveFileTreeData(fileTree: any) {
    const projectData = {
      interactables: this.interactableData,
      variables: this.variableData,
      jstree: fileTree
    };
    this.downloadService.download('project.json', JSON.stringify(projectData));
    this.sentRequest = false;
  }
}
