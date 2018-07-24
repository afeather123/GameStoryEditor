import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWFieldsComponent } from './data-w-fields.component';

describe('DataWFieldsComponent', () => {
  let component: DataWFieldsComponent;
  let fixture: ComponentFixture<DataWFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataWFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataWFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
