import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('fileName') fileName: ElementRef;

  constructor(private downloadService: DownloadService) { }

  ngOnInit() {
    this.downloadService.NameObservable().subscribe((name: string) => {this.ChangeName(name); });
  }

  ChangeName(name: string) {
    this.fileName.nativeElement.value = name;
  }

  OnChangeName(e: string) {
    this.downloadService.filename = e;
  }
}
