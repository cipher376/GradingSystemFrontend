import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models';
import { RolePolicy, POLICY_TYPE } from 'src/app/models/role-policy';
import { UserService, AdminService } from 'src/app/shared/services';
import { SignalService } from 'src/app/shared/services/signal.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-to-role',
  templateUrl: './user-to-role.component.html',
  styleUrls: ['./user-to-role.component.scss']
})
export class UserToRoleComponent implements OnInit, AfterViewInit {
  selectedUser: User = new User();


  title = 'Administrators';
  @ViewChild(DialogComponent, { static: false })
  private dialog?: DialogComponent;


  selectedRole: string = '';
  roles: string[] = [];
  userRoles: string[] = [];

  constructor(
    private signalService: SignalService,
    private userService: UserService,
    private adminService: AdminService,
    private toaster: ToastrService
  ) {
    this.getRoles();
  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    this.userService.getSelectedUserLocal().then(user => {
      this.selectedUser = user;
      this.getUserRoles();
    });
  }

  getRoles() {
    this.adminService.getRoles().subscribe((roles: string[]) => {
      // if (roles?.length > 0) {
      //   roles.forEach(role => {
      //     this.roles.push({
      //       label: role,
      //       value: role
      //     })
      //   })
      // }
      // console.log(this.roles);
      this.roles = roles;
    })
  }


  getUserRoles() {
    this.adminService.getUserRoles(this.selectedUser?.id).subscribe((roles: string[]) => {
      this.userRoles = roles;
    });
  }

  assignUser() {
    const policy: RolePolicy = {
      ptype: POLICY_TYPE.GROUP,
      subject: 'u'+this.selectedUser?.id,
      role: this.selectedRole,
      object: '',
      action: '',
      domain: ''

    }
    this.adminService.addRole(policy)?.subscribe((policy: RolePolicy) => {
      console.log(policy);
      policy = policy ?? policy;
      if (policy?.id) {
        this.toaster.info('Role saved!');
        policy = new RolePolicy();
      }
      this.getUserRoles();
    }, (error: any) => {
      console.log('Saving role failed');
      console.error(error);
      this.toaster.error('Error saving role')
    });
  }

  deleteUserRole(role: string) {
    const p = {
      ptype: POLICY_TYPE.GROUP,
      subject: 'u' + this.selectedUser?.id,
      role: role,
      object: '',
      action: '',
      domain: ''
    }
    this.adminService.deleteRole(p).subscribe(() => {
      this.toaster.success(`${this.selectedUser?.email} is removed from ${role} role!`);
      this.getUserRoles();
    }, () => {
      this.toaster.error('Role deletion failed!')
    });
  }
}
