import { ToastrService } from 'ngx-toastr';
import { User } from './../../../../models/user';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SignalService, MY_ACTION } from '../../../../shared/services/signal.service';
import { AdminService } from '../../../../shared/services/admin.service';
import { DialogComponent } from 'src/app/ui-components/dialog/dialog.component';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit, AfterViewInit {
  // selectedRole?: any; // Role;
  // selectedRoles: any; // Role[] = [];
  roleTitle = 'Administrators';


  selectedUser?: User;
  selectedUsers: User[] = [];
  userTitle = 'Administrators';

  constructor(
    private _toaster: ToastrService,
    private _signalService: SignalService,
    private _adminService: AdminService
  ) { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
  }

  // reloadRoles() {
  //   this._signalService.sendAction(MY_ACTION.reloadRoles);
  // }

  // showDeleteDialog() {
  //   this.dialog?.showDeleteDialog();
  // }

  // applyAction($action: number) {
  //   console.log($action);
  //   if ($action === MY_ACTION.delete) {
  //     // this._adminService.deleteRole(this.selectedRole.id).subscribe(res => {
  //     //   this.reloadRoles();
  //     //   this.selectedRole = null;
  //     // });
  //   }
  // }

}
