import { Component, OnInit } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { VariableSelectService } from '../../services/variable-select.service';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-game-format',
  templateUrl: './game-format.component.html',
  styleUrls: ['./game-format.component.css']
})
export class GameFormatComponent implements OnInit {

  constructor(private downloadService: DownloadService) { }
  sentRequest = false;

  ngOnInit() {

  }

  DownloadGameData() {
    this.downloadService.DownloadProject(false);
  }
}
