import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalVarSelectComponent } from './global-var-select.component';

describe('GlobalVarSelectComponent', () => {
  let component: GlobalVarSelectComponent;
  let fixture: ComponentFixture<GlobalVarSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalVarSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalVarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
