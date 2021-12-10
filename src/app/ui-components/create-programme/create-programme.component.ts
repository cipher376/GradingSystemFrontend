import { SchoolService } from './../../shared/services/school.service';
import { Programme } from './../../models/programme';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-create-programme',
  templateUrl: './create-programme.component.html',
  styleUrls: ['./create-programme.component.scss']
})
export class CreateProgrammeComponent implements OnInit {
  public programmeForm: FormGroup = this.fb.group({});;

  programme: Programme = new Programme;

  public selectedFaculty: IOption = {} as any;
  public selectedStates: Array<IOption> = [];

  public faculties: Array<IOption> = [];
  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private toaster: ToastrService,
    private schoolService: SchoolService
  ) {
    ['Humanities',
      'Natural sciences and mathematics',
      'Social sciences',
      'Education'].forEach(f => {
        this.faculties.push({ value: f, label: f })
      })

    this.createProgrammeForm();
  }

  ngOnInit(): void {
  }

  createProgrammeForm() {
    this.programmeForm = this.fb.group({
      name: [
        this.programme.name,
        [
          Validators.required
        ]
      ],
      numberYears: [
        this.programme.numberYears,
        [
          Validators.required,
        ]
      ],
      faculty: [
        this.programme.faculty,
        [
          Validators.maxLength(100)
        ]
      ]
    });
  }


  createProgramme() {
    this.programme.name = this.programmeForm.value.name
    this.programme.numberYears = this.programmeForm.value.numberYears
    this.programme.faculty = this.programmeForm.value.faculty
    this.schoolService.createProgramme(this.programme).subscribe(p => {
      if (!p?.count)
        this.programme = p;
      this.toaster.success('Programme saved!')
    })
  }


  clear() {
    this.programme = new Programme();
    this.createProgrammeForm();
  }

}
