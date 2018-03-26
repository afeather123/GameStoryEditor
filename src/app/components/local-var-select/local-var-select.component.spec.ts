import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVarSelectComponent } from './local-var-select.component';

describe('LocalVarSelectComponent', () => {
  let component: LocalVarSelectComponent;
  let fixture: ComponentFixture<LocalVarSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalVarSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
