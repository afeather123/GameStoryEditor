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
  }

  DownloadProject() {
    this.downloadService.DownloadProject(true);
  }

}
