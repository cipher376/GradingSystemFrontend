import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryWrapper2Component } from './gallery-wrapper2.component';

describe('GalleryWrapper2Component', () => {
  let component: GalleryWrapper2Component;
  let fixture: ComponentFixture<GalleryWrapper2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryWrapper2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryWrapper2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
