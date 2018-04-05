import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Select2MultipleComponent } from './select2-multiple.component';

describe('Select2MultipleComponent', () => {
  let component: Select2MultipleComponent;
  let fixture: ComponentFixture<Select2MultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Select2MultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Select2MultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
