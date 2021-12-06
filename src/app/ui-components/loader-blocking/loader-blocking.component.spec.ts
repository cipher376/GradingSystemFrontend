import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBlockingComponent } from './loader-blocking.component';

describe('LoaderBlockingComponent', () => {
  let component: LoaderBlockingComponent;
  let fixture: ComponentFixture<LoaderBlockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderBlockingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBlockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
