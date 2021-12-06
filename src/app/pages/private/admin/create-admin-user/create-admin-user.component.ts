import { Credentials } from './../../../../models/user';
import { LatLng } from './../../../../models/LatLng';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { User, Profile, Address, GeoPoint } from '../../../../shared/identity-sdk';
// import { ToasterService } from '../../../../shared/services/toaster.service';
// import { MyAuthService } from '../../../../shared/services/my-auth.service';
// import { UserService } from '../../../../shared/services/user.service';
// import { MyLocalStorageService } from '../../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { Address, Country, Profile, User } from 'src/app/models';
import { MyAuthService, UserService, UtilityService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { ToastrService } from 'ngx-toastr';
// import { SignalService, MY_ACTION } from '../../../../shared/services/signal.service';
// import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrls: ['./create-admin-user.component.scss']
})
export class CreateAdminUserComponent implements OnInit, OnDestroy, AfterViewInit {


  public selectedUser?: User;

  constructor(
    private userService: UserService,
    private signal: SignalService,
  ) {
    this.loadUserLocal();
  }

  ngOnInit() {
    this.signal._action$.subscribe(action => {
      if (action = MY_ACTION.reloadUser) {
       this.loadUserLocal();
      }
    })
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {

  }

  loadUserLocal(){
    this.userService.getSelectedUserLocal().then(user => {
      this.selectedUser = user;
    })
  }


}
