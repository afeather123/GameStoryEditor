import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFormatComponent } from './game-format.component';

describe('GameFormatComponent', () => {
  let component: GameFormatComponent;
  let fixture: ComponentFixture<GameFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
