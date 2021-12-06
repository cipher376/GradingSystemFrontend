import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderNonBlockingComponent } from './loader-non-blocking.component';

describe('LoaderNonBlockingComponent', () => {
  let component: LoaderNonBlockingComponent;
  let fixture: ComponentFixture<LoaderNonBlockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderNonBlockingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderNonBlockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
