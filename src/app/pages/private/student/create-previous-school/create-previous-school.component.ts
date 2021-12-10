import { AcademicRecord } from './../../../../models/AcademicRecord';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { UtilityService, UserService } from 'src/app/shared/services';
import { SchoolService } from 'src/app/shared/services/school.service';

@Component({
  selector: 'app-create-previous-school',
  templateUrl: './create-previous-school.component.html',
  styleUrls: ['./create-previous-school.component.scss']
})
export class CreatePreviousSchoolComponent implements OnInit {
  public academicRecordForm: FormGroup = this.fb.group({});;

  academicRecord: AcademicRecord = new AcademicRecord();
  student = new Student();

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
    private schoolService: SchoolService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createAcademicRecordForm();
    this.student.user = this.userService.getLoggedUserLocalSync()
  }

  @Input() set Student(student: Student) {
    this.student = student;
  }

  @Input() set AcademicRecord(record: any) {
    this.academicRecord = record;
  }

  get AcademicRecord(){
    return this.academicRecord;
  }

  createAcademicRecordForm() {
    this.academicRecordForm = this.fb.group({
      schoolName: [
        this.academicRecord.schoolName,
        [
          Validators.required
        ]
      ],
      programme: [
        this.academicRecord.programme,
        [
          Validators.required,
        ]
      ],
      yearOfCompletion: [
        this.academicRecord.yearOfCompletion,
        [
          Validators.maxLength(100)
        ]
      ],
      yearOfCommencement: [
        this.academicRecord.yearOfCommencement,
        [
          Validators.maxLength(100)
        ]
      ],
      cgpa: [
        this.academicRecord.cgpa,
        [
          Validators.maxLength(100)
        ]
      ]
    });
  }


  createAcademicRecord() {
    this.academicRecord = this.academicRecordForm.value
    this.academicRecord.yearOfCommencement = new Date(this.academicRecordForm.value.yearOfCommencement)
    this.academicRecord.yearOfCompletion = new Date(this.academicRecordForm.value.yearOfCompletion)
    this.schoolService.createAcademicRecord(this.student.id, this.academicRecord).subscribe(p => {
      this.academicRecord = p;
      this.toaster.success('AcademicRecord saved!')
    })
  }


  clear() {
    this.academicRecord = new AcademicRecord();
    this.createAcademicRecordForm();
  }


}
