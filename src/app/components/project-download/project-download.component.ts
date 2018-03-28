import { Component, OnInit } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { VariableSelectService } from '../../services/variable-select.service';

@Component({
  selector: 'app-project-download',
  templateUrl: './project-download.component.html',
  styleUrls: ['./project-download.component.css']
})
export class ProjectDownloadComponent implements OnInit {

  interactableData: any;
  variableData: any;

  constructor(private interactableService: InteractableService,
  private variableSelectService: VariableSelectService
  ) { }

  ngOnInit() {
    this.interactableService.JSTreeLoadObservable().subscribe((fileTree: any) => {
      this.RecieveFileTreeData(fileTree);
    });
  }

  DownloadProject() {
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
    this.download('project.json', JSON.stringify(projectData));
  }

  download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
