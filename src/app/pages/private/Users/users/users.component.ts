import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SignalService, MY_ACTION } from '../../../../shared/services/signal.service';
import { UserService } from '../../../../shared/services/user.service';
import { AdminService } from '../../../../shared/services/admin.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  selectedUser?: User;
  selectedUsers: User[] = [];

  title = 'Users';

  constructor(
    private signals: SignalService,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
    // private storeAdminService: AdminStoreService
  ) { }

  ngOnInit() {
    // this.signals._action$.subscribe(action => {
    //   if (action === MY_ACTION.rolesLoaded) {
    //     this._adminService.getRolesLocal().then((roles) => {
    //       this.roles = roles;
    //     });
    //     if (this.selectedUser) {
    //       this._adminService.getUserRoles(this.selectedUser.myUser.id).then(roles => {
    //         this.selectedUserRoles = roles;
    //       });
    //     }
    //   } else if (action === MY_ACTION.roleMapsLoaded) {
    //     this._adminService.getRolesLocal().then((maps) => {
    //       this.roleMaps = maps;
    //     });
    //     if (this.selectedUser) {
    //       this._adminService.getUserRoles(this.selectedUser.myUser.id).then(roles => {
    //         this.selectedUserRoles = roles;
    //       });
    //     }
    //   }
    // });
  }

  ngAfterViewInit(): void {
    // this.signals.sendAction(MY_ACTION.loadAdminUsers);
    this.signals.sendAction(MY_ACTION.loadAllUsers);
    // this.signals.sendAction(MY_ACTION.rolesLoaded);
    // this.signals.sendAction(MY_ACTION.roleMapsLoaded);
  }


  applyAction($action: number) {
    // console.log($action);
    // if ($action === MY_ACTION.delete) {
    //   this._userService.deleteUser('' + this.selectedUser.myUser.id).subscribe(res => {
    //     this.reloadUsers();
    //     this.selectedUser = null;
    //   });
    // }
  }

  set SelectedUser(user: User) {
    this.selectedUser = user;
    console.log(user);
    this.userService.setSelectedUserLocal(user).then(() => {
      this.router.navigateByUrl('/app/users/user-details')
    })
  }

  get SelectedUser() {
    return this.selectedUser as any;
  }


  set SelectedUsers(user: User[]) {
    this.selectedUsers = user;
    console.log(user);
  }

  get SelectedUsers() {
    return this.selectedUsers as any;
  }


}
