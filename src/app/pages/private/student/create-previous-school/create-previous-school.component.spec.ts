import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePreviousSchoolComponent } from './create-previous-school.component';

describe('CreatePreviousSchoolComponent', () => {
  let component: CreatePreviousSchoolComponent;
  let fixture: ComponentFixture<CreatePreviousSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePreviousSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePreviousSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
