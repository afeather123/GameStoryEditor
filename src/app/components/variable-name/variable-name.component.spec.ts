import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableNameComponent } from './variable-name.component';

describe('VariableNameComponent', () => {
  let component: VariableNameComponent;
  let fixture: ComponentFixture<VariableNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
