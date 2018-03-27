import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectWrapperComponent } from './redirect-wrapper.component';

describe('RedirectWrapperComponent', () => {
  let component: RedirectWrapperComponent;
  let fixture: ComponentFixture<RedirectWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
