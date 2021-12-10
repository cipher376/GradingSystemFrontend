import { SchoolService } from './../../shared/services/school.service';
import { Programme } from './../../models/programme';
import { Course, CourseProgrammeThrough } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-assign-course-programme',
  templateUrl: './assign-course-programme.component.html',
  styleUrls: ['./assign-course-programme.component.scss']
})
export class AssignCourseProgrammeComponent implements OnInit {
  public assignForm: FormGroup = this.fb.group({});;

  selectedCourse: Course = new Course();
  selectedProgramme: Programme = new Programme();

  programmeList: Array<IOption> = [];
  courseList: Array<IOption> = [];

  courseProgrammeThrough: CourseProgrammeThrough = new CourseProgrammeThrough()

  constructor(
    private schoolService: SchoolService,
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {

    this.getAllProgrammes();
    this.getAllCourses();
    this.createForm();
  }

  createForm(){
    this.assignForm = this.fb.group({
      programmeId: [
        '',
        [
          Validators.required
        ]
      ],
      courseId: [
        '',
        [
          Validators.required,
        ]
      ]
    });
  }

  getAllProgrammes() {
    this.schoolService.getProgrammes().subscribe((prgs: Programme[]) => {
      console.log(prgs);
      prgs?.forEach(prg => {
        if (prg.id && prg.name)
          this.programmeList.push({ value: prg.id, label: prg.name })
      });
      console.log(this.programmeList);
      this.createForm();
    })
  }

  getAllCourses(){
    this.schoolService.getCourses().subscribe((cs: Course[]) => {
      cs?.forEach(c => {
        if (c.id && c.name)
          this.courseList.push({ value: c.id, label: c.name })
      });
      this.createForm();
    })
  }


  assignCourse(){
   this.courseProgrammeThrough.programmeId = this.assignForm.value.programmeId
   this.courseProgrammeThrough.courseId = this.assignForm.value.courseId

   this.schoolService.linkCourseToProgramme(this.courseProgrammeThrough).subscribe((cp: any) => {
     this.courseProgrammeThrough = cp;

     this.toaster.success('Course is assigned to programme')
   })
  }

  clear(){
    this.courseProgrammeThrough = new CourseProgrammeThrough();
  }
}
