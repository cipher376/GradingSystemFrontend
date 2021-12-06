import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { UserService } from 'src/app/shared/services';
import { UtilityService } from '../../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile, User } from 'src/app/models';

@Component({
  selector: 'app-create-user-profile',
  templateUrl: './create-user-profile.component.html',
  styleUrls: ['./create-user-profile.component.scss']
})
export class CreateUserProfileComponent implements OnInit, AfterViewInit {

  public profForm: FormGroup = this.fb.group({});;
  public profile: Profile = new Profile();
  public selectedUser?: User;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private util: UtilityService,
    private userService: UserService,
    private signal: SignalService
  ) {
    this.createProfileForm();

  }

  ngAfterViewInit(): void {
    this.loadUser()
  }

  async ngOnInit() {
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.reloadUser) {
        this.loadUser();
      }
    });
  }


  async loadUser() {
    this.selectedUser = await this.userService.getSelectedUserLocal();
    this.profile = this.selectedUser?.profile || new Profile();
    this.createProfileForm();
  }


  createProfileForm() {
    this.profForm = this.fb.group({
      firstName: [
        this.profile.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      lastName: [
        this.profile.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      otherName: [
        this.profile.otherName ?? '',
        [
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      gender: [this.profile.gender || '', Validators.required],
      dateOfBirth: [this.profile?.dateOfBirth ? this.util.formatDateFormRebind(this.profile?.dateOfBirth) : '', Validators.required],
      about: [this.profile.about]
    });

  }

  getProdfileData() {
    if (!this.profForm?.valid) {
      console.log(this.profForm);
      // alert("Invalid data")
      this.toaster.error('Provide valid data!');
      return false;
    }

    if (!this.selectedUser || !this.selectedUser.id) {
      this.toaster.error('Please select user or create new user ');
      return false;
    }

    this.profile.firstName = this.profForm?.value.firstName;
    this.profile.lastName = this.profForm?.value.lastName;
    this.profile.otherName = this.profForm?.value.otherName ?? '';
    this.profile.dateOfBirth = new Date(this.profForm?.value.dateOfBirth);
    this.profile.about = this.profForm?.value.about ?? '';
    this.profile.gender = this.profForm?.value.gender;

    this.profile.userId = this.selectedUser.id;

    return true;
  }

  // save | update profile
  onSaveProfile() {
    if (!this.getProdfileData()) {
      return;
    }

    this.userService.createUpdateProfile(this.selectedUser?.id, this.profile).subscribe((profile: Profile) => {
      console.log(profile);
      if (this.selectedUser && profile) {
        this.selectedUser.profile = <Profile>profile;
        this.profile = <Profile>profile;

        // update profile on disk
        this.userService.setSelectedUserLocal(this.selectedUser);
        this.signal.sendAction(MY_ACTION.reloadUser);

        this.toaster.info('Profile saved!');

      }
    }, (error: string) => {
      console.log(error);
      this.toaster.error('Check nework  | try again later');
    });

  }

}
