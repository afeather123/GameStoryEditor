import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('fileName') fileName: ElementRef;
  subscription: Subscription;

  constructor(private downloadService: DownloadService) { }

  ngOnInit() {
    this.subscription = this.downloadService.NameObservable().subscribe((name: string) => {this.ChangeName(name); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ChangeName(name: string) {
    this.fileName.nativeElement.value = name;
  }

  OnChangeName(e: string) {
    this.downloadService.filename = e;
  }
}
