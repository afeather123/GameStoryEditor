import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

@Injectable()
export class DownloadService {

  filename = '';
  nameChange: Subject<string> = new Subject<string>();

  ChangeFileName(name: string) {
    this.filename = name;
    this.nameChange.next(name);
  }

  NameObservable(): Observable<string> {
    return this.nameChange.asObservable();
  }

  constructor() { }

  download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    if (this.filename === '') {
      element.setAttribute('download', filename);
    } else {
      element.setAttribute('download', this.filename + '.json');
    }

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
