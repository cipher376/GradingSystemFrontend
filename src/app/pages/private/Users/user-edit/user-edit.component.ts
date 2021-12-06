import { User } from './../../../../models/user';
import { AdminService } from '../../../../shared/services/admin.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyLocalStorageService } from '../../../../shared/services/local-storage.service';
import { MyAuthService } from '../../../../shared/services/my-auth.service';
import { SignalService, MY_ACTION } from '../../../../shared/services/signal.service';
import { UserService } from '../../../../shared/services/user.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy, AfterViewInit {
  public selectedUser?: User;
  public loggedUser?: User;
  isOwner = false;


  constructor(
    private _userService: UserService,

  ) {

  }

  ngOnInit() {
    // this.user$ = this._signal._action$.subscribe(action => {
    //   if (action === MY_ACTION.userLoaded) {
    //     this.loadUser();
    //   }
    // });
    // this._signal.sendAction(MY_ACTION.reloadUser);
    // this.loadUser();
  }

  async ngAfterViewInit() {
    this.selectedUser = await this._userService.getSelectedUserLocal();
  }

  ngOnDestroy() {

  }


}
