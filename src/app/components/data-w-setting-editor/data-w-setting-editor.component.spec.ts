import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWSettingEditorComponent } from './data-w-setting-editor.component';

describe('DataWSettingEditorComponent', () => {
  let component: DataWSettingEditorComponent;
  let fixture: ComponentFixture<DataWSettingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataWSettingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataWSettingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
