import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRendererComponent } from './asset-renderer.component';

describe('AssetRendererComponent', () => {
  let component: AssetRendererComponent;
  let fixture: ComponentFixture<AssetRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
