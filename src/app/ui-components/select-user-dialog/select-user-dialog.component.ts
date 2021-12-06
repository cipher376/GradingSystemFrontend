import { User } from 'src/app/models';
import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { dialogType } from '../dialog/dialog.component';
import { AdminService, UserService, USER_ROLE } from 'src/app/shared/services';

@Component({
  selector: 'app-select-user-dialog',
  templateUrl: './select-user-dialog.component.html',
  styleUrls: ['./select-user-dialog.component.scss']
})
export class SelectUserDialogComponent implements OnInit, AfterViewInit {


  @ViewChild('dialog', { static: false }) public dialog?: ModalDirective;
  message = '';
  title = '';
  size = 'lg'; // or lg
  type: dialogType = dialogType.normal;
  confirm = false;

  cancelBtnMessage = '';
  actionBtnMessage = '';

  action?: MY_ACTION;

  selectedUser?: User;

  private users: User[] = [];

  @Output() actionEvent = new EventEmitter<any>();

  isAdmin = false;

  @Input() loadUsers = true;

  constructor(
    private signal: SignalService,
    private userService: UserService,
    private adminService: AdminService
  ) { }


  async ngAfterViewInit() {
    this.signal.sendAction(MY_ACTION.loadAllUsers);
    this.isAdmin = this.adminService.loggedUserHasRole(USER_ROLE.ADMIN);
  }

  ngOnInit() {
  }


  @Input() set Users(users: User[]) {
    if (users?.length > 0) {
      this.users = users;
    }
  }

  get Users() {
    return this.users;
  }


  set SelectedUser(user: User) {
    this.selectedUser = user;
    this.userService.setSelectedUserLocal(user);
    this.signal.sendAction(MY_ACTION.userLoaded);
    this.signal.sendAction(MY_ACTION.reloadUser);
    this.close();
  }

  show(message: string, title: string, size = 'lg', type = dialogType.normal) {
    this.message = message;
    this.title = title;
    this.size = size;
    this.type = type;
    this.confirm = false;
    this.dialog?.show();
  }


  broadcastAction() {
    this.actionEvent.emit(this.action);
    this.dialog?.hide();
  }

  close() {
    this.broadcastAction();
    this.dialog?.hide();
  }

}
