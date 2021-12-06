import { UserService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from './../../shared/services/utility.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Address, Country, Profile } from 'src/app/models';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-create-user-address',
  templateUrl: './create-user-address.component.html',
  styleUrls: ['./create-user-address.component.scss']
})
export class CreateUserAddressComponent implements OnInit, AfterViewInit {

  public selectedUser?: User;
  public address: Address = new Address();

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private signal: SignalService,
    private toaster: ToastrService,
    private userService: UserService
  ) {

  }

  ngAfterViewInit(): void {
    this.loadUser()
  }

  async ngOnInit() {
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.reloadUser) {
        this.loadUser();
      }
    })

  }

  async loadUser() {
    this.selectedUser = await this.userService.getSelectedUserLocal();
    this.address = this.selectedUser?.address || new Address();
  }




  save($event: Address) {
    if (!this.selectedUser || !this.selectedUser.id) {
      this.toaster.error('Cannot add address if user is empty');
      return;
    }
    this.address.userId = this.selectedUser.id;
    this.address = $event;
    this.userService.createUpdateAddress(this.selectedUser?.id, this.address).subscribe((address: Address) => {
      if (this.selectedUser) {
        this.selectedUser.address = address;
        this.address = address;
        this.userService.setSelectedUserLocal(this.selectedUser);
        this.signal.sendAction(MY_ACTION.reloadUser);
        this.toaster.info('Address saved!');
      }
    }, error => {
      console.log(error);
      this.toaster.error('Check network  | try again later');
    });
  }



}
