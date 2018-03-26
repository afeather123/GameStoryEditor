import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVarEditorComponent } from './local-var-editor.component';

describe('LocalVarEditorComponent', () => {
  let component: LocalVarEditorComponent;
  let fixture: ComponentFixture<LocalVarEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalVarEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
