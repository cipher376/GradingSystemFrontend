import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseProgrammeComponent } from './assign-course-programme.component';

describe('AssignCourseProgrammeComponent', () => {
  let component: AssignCourseProgrammeComponent;
  let fixture: ComponentFixture<AssignCourseProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCourseProgrammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCourseProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
