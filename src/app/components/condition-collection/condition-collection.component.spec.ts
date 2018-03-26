import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionCollectionComponent } from './condition-collection.component';

describe('ConditionCollectionComponent', () => {
  let component: ConditionCollectionComponent;
  let fixture: ComponentFixture<ConditionCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
