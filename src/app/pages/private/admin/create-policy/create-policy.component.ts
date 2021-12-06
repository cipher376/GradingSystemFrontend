import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { RolePolicy, POLICY_TYPE, Role } from '../../../../models/role-policy';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit, AfterViewInit {

  public policyForm: FormGroup = this.fb.group({});
  public policy: RolePolicy = new RolePolicy();
  public ptypes: Array<IOption> = [];
  public policy_type = POLICY_TYPE;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private signal: SignalService
  ) {
    this.createPolicyForm();
  }


  ngAfterViewInit() {
    this.policy = this.adminService.getSelectedPolicyLocal() ?? new RolePolicy();  // enable editing of existing policy
    this.getRoles();
    this.createPolicyForm();
  }

  ngOnInit() {
    this.ptypes = [
      {
        value: POLICY_TYPE.POLICY,
        label: 'Role policy',
        disabled: false
      },
      {
        value: POLICY_TYPE.GROUP,
        label: 'Role (Group)',
        disabled: false
      }
    ]
  }

  get selectedPolicyType() {
    return this.policyForm?.value.ptype;
  }




  createPolicyForm() {
    this.policyForm = this.fb.group({
      ptype: [
        this.policy?.ptype,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(5)
        ]
      ],
      subject: [
        this.policy?.subject,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],
      object: [
        this.policy?.object,
        [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],
      action: [
        this.policy?.action ?? '',
        [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],
      domain: [
        this.policy?.domain ?? '',
        [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],
      role: [
        this.policy?.role ?? '',
        [
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  getData(): boolean {

    if (this.policy) {
      this.policy.ptype = this.policyForm?.value.ptype;
      this.policy.subject = this.policyForm?.value.subject;
      this.policy.object = this.policyForm?.value.object ?? '';
      this.policy.action = this.policyForm?.value.action ?? '';
      this.policy.domain = this.policyForm?.value.domain ?? '';
      this.policy.role = this.policyForm?.value.role ?? '';
    }

    if (!this.policy.ptype) {
      this.toaster.error('Select policy type')
      return false;
    }
    if (!this.policy.subject) {
      this.toaster.error('Provide policy subject')
      return false;
    }
    return true;
  }

  save() {
    if (!this.getData()) {
      console.log('Invalid data');
      return;
    }

    if (this.policy.ptype === POLICY_TYPE.POLICY) {
      // creating user policy
      this.adminService.createUpdatePolicy(this.policy)?.subscribe((policy: RolePolicy) => {
        console.log(policy);
        this.policy = policy ?? this.policy;
        if (policy?.subject) {
          this.toaster.success('Role policy saved!');
          this.signal.sendAction(MY_ACTION.loadAllRolePolicies)
          this.policy = new RolePolicy();
        }
      }, error => {
        console.log('Saving policy failed');
        console.error(error);
        this.toaster.error('Error saving policy')
      });
    } else {

      // creating user role
      if (!this.policy.role) {
        this.toaster.error('Provide subjects role!')
        return false;
      }
      this.adminService.addRole(this.policy)?.subscribe((policy: RolePolicy) => {
        console.log(policy);
        this.policy = policy ?? this.policy;
        if (policy?.subject) {
          this.toaster.info('Role saved!');
          this.signal.sendAction(MY_ACTION.loadAllRoles)
          this.policy = new RolePolicy();
        }
      }, (error: any) => {
        console.log('Saving role failed');
        console.error(error);
        this.toaster.error('Error saving role')
      });
    }

    return;
  }

  clear(){
    this.policy = new RolePolicy();
    this.createPolicyForm();
  }

  getRoles() {
    this.adminService.getRoles()?.subscribe((roles: Role[]) => {
      console.log(roles);
    })
  }

}
