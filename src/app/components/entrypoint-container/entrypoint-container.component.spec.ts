import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrypointContainerComponent } from './entrypoint-container.component';

describe('EntrypointContainerComponent', () => {
  let component: EntrypointContainerComponent;
  let fixture: ComponentFixture<EntrypointContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrypointContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrypointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
