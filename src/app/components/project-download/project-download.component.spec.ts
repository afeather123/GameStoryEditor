import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDownloadComponent } from './project-download.component';

describe('ProjectDownloadComponent', () => {
  let component: ProjectDownloadComponent;
  let fixture: ComponentFixture<ProjectDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
