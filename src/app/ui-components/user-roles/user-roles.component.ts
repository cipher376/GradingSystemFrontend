import { ToastrService } from 'ngx-toastr';
import { RolePolicy, POLICY_TYPE, Role } from 'src/app/models/role-policy';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { AdminService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  loggedUser?: User;
  selectedUser?: User;

  userRoles: string[] = [];

  constructor(
    private adminService: AdminService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  @Input() set SelectedUser(user: User) {
    this.selectedUser = user;
    this.loadUserRoles();
  }

  get SelectedUser() {
    return this.selectedUser as User;
  }



  deleteUserRole(role: string) {
    const p = new RolePolicy({
      ptype: POLICY_TYPE.GROUP,
      subject: 'u' + this.SelectedUser?.id,
      role: role
    })
    this.adminService.deleteRole(p).subscribe(() => {
      this.toaster.success(`${this.selectedUser?.email} is removed from ${role} role!`)
    }, () => {
      this.toaster.error('Role deletion failed!')
    });
  }

  loadUserRoles() {
    if (this.selectedUser) {
      this.adminService.getUserRoles(this.SelectedUser.id).subscribe((roles: string[]) => {
        this.userRoles = roles;
      })
    }
  }

}
