import { ToastrService } from 'ngx-toastr';
import { User } from './../../models/user';

import { Router } from '@angular/router';
import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AdminService, UserService, USER_ROLE, UtilityService } from 'src/app/shared/services';
import { UploadComponent } from '../upload/upload.component';
import { SignalService } from 'src/app/shared/services/signal.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, AfterViewInit {

  loggedUser?: User;
  @Input() loggedUserIsAdmin = false;
  hideMessageBtn = false;
  isOwner = false;

  selectedUser: User;


  userImage = '';

  uniquePad = '';
  uploadUrl = '';
  // profilePhoto: any;

  @ViewChild(UploadComponent, { static: false })
  private upload?: UploadComponent;

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private signal: SignalService,
    private toaster: ToastrService,
  ) {
    this.uniquePad = UtilityService.generateRandomNumber();
    this.selectedUser = new User();
    this.uploadUrl = environment.file_api_upload_photo_video_url_root + '/true';
  }


  async ngAfterViewInit() {

    this.SelectedUser = await this.userService.getSelectedUserLocal();
    console.log(this.SelectedUser);
    this.getUserProfile();
    this.adminService.getUserRoles(this.SelectedUser?.id).subscribe((roles: string[]) => {
      console.log(roles);
      this.userService.setSelectedUserRolesLocal(roles);
    });

    this.loggedUser = this.userService.getLoggedUserLocalSync();
    console.log(this.loggedUser);
    if (this.SelectedUser.id === this.loggedUser.id) {
      this.isOwner = true;
    }

    this.loggedUserIsAdmin = this.adminService.loggedUserHasRole(USER_ROLE.ADMIN);
    if (this.loggedUserIsAdmin) {
      this.hideMessageBtn = true;

    }


  }

  ngOnInit() {


    // // handle profile upload complete event
    this.signal.uploadCompleteSource$.subscribe(files => {
      // create photo object for profile or update existing one;

    });
  }

  @Input() set SelectedUser(user: User) {
    this.selectedUser = user;

    if (user && user.profilePhoto) {
      this.userImage = environment.file_api_download_url_root + (user.profilePhoto.thumbnail ?? user.profilePhoto?.source);
    }
  }

  get SelectedUser() {
    return this.selectedUser;
  }

  @Input() set UploadedFiles(files: any) {
    this.uploadFile(files);
  }


  sendMessage() {

  }

  edit() {
    this.userService.setSelectedUserLocal(this.SelectedUser);
    setTimeout(() => {
      this.router.navigateByUrl('/app/users/user-edit');
    }, 500);
  }

  changeImage() {

  }

  getUserOnlineStatus() {

  }

  addRole() {
    this.userService.setSelectedUserLocal(this.selectedUser);
    this.router.navigateByUrl('/app/admin-users/user-to-roles');
  }


  getUserProfile() {
    // this.userService.getUserDetails(this.selectedUser?.id, {}, false).subscribe(user => {
    //   console.log(user);
    //   this.SelectedUser = user;
    // })
    this.userService.getUserProfile(this.selectedUser?.id).subscribe(user => {
      console.log(user);
      this.SelectedUser = user;

    })
  }




  uploadFile(files: any) {
    let file;
    if (files?.length > 0) {
      file = files[0];
    } else {
      return;
    }

    // const photo = new Photo();
    // photo.source = file?.source;
    // photo.fileId = file?.id;
    // photo.mimeType = file?.mimeType;
    // photo.size = file?.size;
    // photo.thumbnail = 'thumb_' + file?.source;
    // console.log(photo);
    // this.userService.updateProfilePhoto(this.selectedUser?.id as any, photo)?.subscribe((photo: Photo) => {
    //   console.log(photo);
    //   if (photo) {
    //     this.selectedUser.profilePhoto = photo;
    //     setTimeout(() => {
    //       this.SelectedUser = this.selectedUser;
    //     }, 2000);
    //     this.userService.setSelectedUserLocal(this.selectedUser);
    //   }
    //   if (this.loggedUser && this.loggedUser?.id === this.selectedUser?.id) {
    //     this.loggedUser.profilePhoto = photo;
    //     this.userService.setLoggedUserLocal(this.loggedUser);
    //   }
    // }, error => {
    //   console.log(error);
    //   this.toaster.error('Changing profile picture failed');
    // });
  }
}
