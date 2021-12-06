import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { PageInfo } from 'src/app/models/page';
import { RolePolicy } from 'src/app/models/role-policy';
import { AdminService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { DataTableColumns } from 'src/app/ui-components/data-table/data-table.component';

@Component({
  selector: 'app-role-policy-list',
  templateUrl: './role-policy-list.component.html',
  styleUrls: ['./role-policy-list.component.scss']
})
export class RolePolicyListComponent implements OnInit, AfterViewInit {
  private rolePolicies: RolePolicy[] = [];
  selectedRolePolicy?: RolePolicy;
  selectedRolePolicies: RolePolicy[] = [];
  skip = 0;
  limit = 1000;

  action?: MY_ACTION;



  columns: DataTableColumns[] = [
    // { label: 'Policy type', path: 'ptype' },
    { label: 'Subject', path: 'subject' },
    { label: 'Object (Effector)', path: 'object' },
    { label: 'Action', path: 'action' },
    // { label: 'Domain', path: 'domain' }
  ];

  @Output() selectedRolePoliciesEvent = new EventEmitter<any>();
  @Output() selectedRolePolicyEvent = new EventEmitter<any>();

  @Input() title = 'Role policies';

  constructor(
    private adminService: AdminService,
    private signals: SignalService,
  ) { }


  ngAfterViewInit(): void {
    this.loadAllRolePolicies();
  }

  ngOnInit() {
    // Subscribe to the signals for reload
    this.signals._action$.subscribe(action => {
      if (action === MY_ACTION.loadAllRolePolicies) {
        this.loadAllRolePolicies();

      } else if (action === MY_ACTION.rolePoliciesLoaded) {
        this.reload(null);
      }
    });
  }


  set RolePolicies(p: RolePolicy[]) {
    this.rolePolicies = p;
  }
  get RolePolices() {
    return this.rolePolicies;
  }


  loadAllRolePolicies() {
    const pageInfo: PageInfo = {
      offset: this.skip,
      limit: this.limit
    };
    this.adminService.getPolicies(pageInfo).subscribe((rolePolicies: RolePolicy[]) => {
      this.rolePolicies = this.rolePolicies.concat(rolePolicies);
      if (this.rolePolicies) {
        this.skip += this.rolePolicies.length;
      }
      this.action = MY_ACTION.loadAllRolePolicies;
    });
  }

  loadMore($event: any) {
    if (this.action) {
      this.signals.sendAction(this.action);
    }
  }

  reload($event: any) {
    this.skip = 0;
    this.rolePolicies = [];
    if (this.action) {
      this.signals.sendAction(this.action);
    }
  }

  onItemClicked($event: any) {
    this.selectedRolePolicy = $event;
    this.selectedRolePolicyEvent.emit($event);
  }


  onItemsSelected($event: any) {
    this.selectedRolePolicies = $event;
    this.selectedRolePoliciesEvent.emit($event);
  }


  deleteRole($event: any) {
    this.selectedRolePolicy = $event;
    this.adminService.deletePolicy(this.selectedRolePolicy as RolePolicy).subscribe(() => {
      this.reload(null);
    });
  }


}
