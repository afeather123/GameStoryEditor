import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectContainerComponent } from './redirect-container.component';

describe('RedirectContainerComponent', () => {
  let component: RedirectContainerComponent;
  let fixture: ComponentFixture<RedirectContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
