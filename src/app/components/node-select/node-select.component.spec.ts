import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSelectComponent } from './node-select.component';

describe('NodeSelectComponent', () => {
  let component: NodeSelectComponent;
  let fixture: ComponentFixture<NodeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
