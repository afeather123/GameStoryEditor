import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceCollectionComponent } from './choice-collection.component';

describe('ChoiceCollectionComponent', () => {
  let component: ChoiceCollectionComponent;
  let fixture: ComponentFixture<ChoiceCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
