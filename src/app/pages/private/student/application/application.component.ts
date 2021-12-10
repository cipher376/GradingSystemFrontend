import { Router } from '@angular/router';
import { AcademicRecord } from './../../../../models/AcademicRecord';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { Programme } from 'src/app/models/programme';
import { Student } from 'src/app/models/student';
import { UtilityService, UserService, AdminService, USER_ROLE } from 'src/app/shared/services';
import { SchoolService } from 'src/app/shared/services/school.service';
import { Address } from 'src/app/models';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  public programmeForm: FormGroup = this.fb.group({});;

  selectedProgramme: Programme = new Programme();


  programmeList: Array<IOption> = [];

  student: Student = new Student();

  address = new Address();
  constructor(
    private schoolService: SchoolService,
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.student = new Student();
    this.student.user = this.userService.getLoggedUserLocalSync();
  }

  ngOnInit(): void {
    this.getStudentByUserId();
    this.getAllProgrammes();
    this.createProgrammeForm();
    console.log(this.student)
  }


  createProgrammeForm() {
    this.programmeForm = this.fb.group({
      programmeId: [
        this.student?.programmeId,
        [
          Validators.required
        ]
      ],
    })
  }

  getAllProgrammes() {
    this.schoolService.getProgrammes().subscribe((prgs: Programme[]) => {
      console.log(prgs);
      prgs?.forEach(prg => {
        if (prg.id && prg.name)
          this.programmeList.push({ value: prg.id, label: prg.name })
      });
      console.log(this.programmeList);
      this.createProgrammeForm();
    })
  }

  createStudent() {
    console.log(this.student)
    this.student.programmeId = this.programmeForm.value.programmeId;
    this.schoolService.createStudent({ programmeId: this.student?.programmeId, userId: this.student?.user?.id }).subscribe(student => {
      this.student = student;
    })
  }


  getStudentByUserId() {
    this.schoolService.getStudentByUserId(this.student?.user?.id).subscribe(stud => {
      if (stud)
        this.student = stud;
    })
  }

  getAcademicRecord() {
    if (this.student.academicRecords?.length)
      try {
        return this.student.academicRecords[0]

      } catch (error) {

      }
    return new AcademicRecord();
  }

  saveAddress(add: any) {
    console.log(add)
    if (add)
      this.userService.createUpdateAddress(this.student?.user?.id, add).subscribe(add => {
        if (this.student?.user)
          this.student.user.address = add;

        this.adminService.addUserToRole(USER_ROLE.STUDENT, this.student.user?.id).subscribe((res: any) => {
          this.router.navigateByUrl('/login')
        })
      })
  }



}
