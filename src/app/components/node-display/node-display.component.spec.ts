import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDisplayComponent } from './node-display.component';

describe('NodeDisplayComponent', () => {
  let component: NodeDisplayComponent;
  let fixture: ComponentFixture<NodeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
