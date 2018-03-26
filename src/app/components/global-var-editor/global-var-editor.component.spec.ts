import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalVarEditorComponent } from './global-var-editor.component';

describe('GlobalVarEditorComponent', () => {
  let component: GlobalVarEditorComponent;
  let fixture: ComponentFixture<GlobalVarEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalVarEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalVarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
