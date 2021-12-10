import { SchoolService } from './../../shared/services/school.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  public courseForm: FormGroup = this.fb.group({});;
  course: Course = new Course()

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
    private schoolService: SchoolService
  ) {
    this.createCourseForm();
  }

  ngOnInit(): void {
  }

  createCourseForm() {
    this.courseForm = this.fb.group({
      name: [
        this.course.name,
        [
          Validators.required
        ]
      ],
      creditHours: [
        this.course.creditHours,
        [
          Validators.required,
        ]
      ],
      code: [
        this.course.code,
        [
          Validators.maxLength(100)
        ]
      ]
    });
  }


  createCourse() {
    this.course.name = this.courseForm.value.name
    this.course.creditHours = this.courseForm.value.creditHours
    this.course.code = this.courseForm.value.code

    this.schoolService.createCourse(this.course).subscribe(c => {
      if (!c?.count)
        this.course = c
      this.toaster.success('Course saved!')
    })
  }

  clear() {
    this.course = new Course()
    this.createCourseForm();
  }

}
