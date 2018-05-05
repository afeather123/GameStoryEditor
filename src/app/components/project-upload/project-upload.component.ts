import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadJsonService } from '../../services/load-json.service';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-project-upload',
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.css']
})
export class ProjectUploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('formButton') formButton: ElementRef;

  constructor(private loadJsonService: LoadJsonService,
  private downloadService: DownloadService) { }

  ngOnInit() {
  }

  loadFile() {
    let input, file;
    if (typeof FileReader !== 'function') {
      alert('The file API isn\'t supported on this browser yet.');
      return;
    }

    input = document.getElementById('fileinput');
    console.log(input);
    if (!input) {
      alert('Um, couldn\'t find the fileinput element.');
    } else if (!input.files) {
      alert('This browser doesn\'t seem to support the `files` property of file inputs.');
    } else if (!input.files[0]) {
      alert('Please select a file before clicking \'Load\'');
    } else {
      file = input.files[0];
      this.loadJsonService.loadFile(file);
    }
  }

  clickFileInput() {
    this.fileInput.nativeElement.click();
  }

  selectedFile() {
    this.formButton.nativeElement.click();
  }
}
