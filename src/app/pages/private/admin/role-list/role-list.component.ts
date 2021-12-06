import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PageInfo } from 'src/app/models/page';
import { Role, RolePolicy } from 'src/app/models/role-policy';
import { AdminService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { DialogComponent } from 'src/app/ui-components/dialog/dialog.component';
import { DataTableColumns } from '../../../../ui-components/data-table/data-table.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, AfterViewInit {

  _roles: Role[] = [];
  selectedRole?: Role;
  selectedRoles: Role[] = [];
  skip = 0;
  limit = 1000;

  action?: MY_ACTION;



  columns: DataTableColumns[] = [
    { label: 'User ID\'s', path: 'subject' },
    { label: 'Roles', path: 'role' }
  ];

  @Output() selectedRolesEvent = new EventEmitter<any>();
  @Output() selectedRoleEvent = new EventEmitter<any>();

  @Input() title = 'Roles';

  @ViewChild(DialogComponent, { static: false })
  private dialog?: DialogComponent;

  dialogActionSub?: Subscription;

  constructor(
    private adminService: AdminService,
    private signals: SignalService,
  ) {

  }


  ngAfterViewInit(): void {
    this.loadAllRoles();
  }

  ngOnInit() {
    // Subscribe to the signals for reload
    this.signals._action$.subscribe(action => {
      if (action === MY_ACTION.loadAllRoles) {
        this.loadAllRoles();

      } else if (action === MY_ACTION.reloadRoles) {
        this.reload(null);
      }
    });
  }


  set roles(roles: Role[]) {
    this._roles = roles;
  }
  get roles() {
    return this._roles;
  }


  loadAllRoles() {
    const pageInfo: PageInfo = {
      offset: this.skip,
      limit: this.limit
    };
    this.adminService.getGroupPolicies(pageInfo).subscribe((roles: Role[]) => {
      this.roles = this.roles.concat(roles);
      if (this.roles) {
        this.skip += this.roles.length;
      }
      this.action = MY_ACTION.loadAllRoles;
    });
  }

  loadMore($event: any) {
    if (this.action) {
      this.signals.sendAction(this.action);
    }
  }

  reload($event: any) {
    this.skip = 0;
    this.roles = [];
    if (this.action) {
      this.signals.sendAction(this.action);
    }
  }

  onItemClicked($event: any) {
    this.selectedRole = $event;
    this.selectedRoleEvent.emit($event);
  }


  onItemsSelected($event: any) {
    this.selectedRoles = $event;
    this.selectedRolesEvent.emit($event);
  }


  deleteRole($event: any) {
    // console.log($event);
    this.selectedRole = $event;
    this.adminService.deleteRole(this.selectedRole as Role).subscribe(() => {
      this.reload(null);
    });
  }


}
