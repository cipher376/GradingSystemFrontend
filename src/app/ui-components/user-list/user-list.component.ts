import { PageInfo } from './../../models/page';
import { MyLocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { UserService, UtilityService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { Address, Profile, User } from 'src/app/models';
import { DataTableColumns } from '../data-table/data-table.component';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {

  private users: any[] = [];
  allUsers: User[] = [];
  selectedUser?: User;
  selectedUsers: User[] = [];
  // skip = 0;
  // limit = 1000;

  pageInfo: PageInfo = {
    offset: 0, // skip
    pageSize: 1000,
    limit: 1000
  }

  action?: MY_ACTION;
  // _userType: UserType;

  @Input() selectAll = true;
  @Input() disableSearch = false;


  columns: DataTableColumns[] = [
    { label: 'Email', path: 'email' },
    { label: 'Phone', path: 'phone' },
    { label: 'First name', path: 'profile.firstName' },
    { label: 'Last name', path: 'profile.lastName' },
    { label: 'Date of birth', path: 'profile.dateOfBirth' }
  ];


  @Output() selectedUsersEvent = new EventEmitter<any>();
  @Output() selectedUserEvent = new EventEmitter<any>();

  @Input() title = 'Users';
  @Input() showAction = false;
  @Input() loadUsers = true;

  searchKey = '';

  // signals
  users_action$: any;

  constructor(
    private userService: UserService,
    private signals: SignalService,
    private util: UtilityService
  ) {
    // Subscribe to the signals for reload
    this.users_action$ = this.signals._action$.subscribe(action => {
      this.action = action;
      // if action has change reset the skip
      if (action === MY_ACTION.searchKeyChanged) {
        this.action = MY_ACTION.searchKeyChanged;
        this.SearchKey = this.util.getSearchKey();
      } else if (this.action === MY_ACTION.loadAllUsers) {
        if (this.loadUsers)
          this.loadAllUsers();
      }
    });

  }


  ngAfterViewInit() {
  }

  ngOnInit() {
    // this.init();
  }


  ngOnDestroy() {
    try {
      this.users_action$.unsubscribe();
    } catch (error) {
    }
  }


  @Input() set Users(users: User[]) {
    // this.allUsers = users;
    this.users = users;
  }

  get Users() {
    return this.users;
  }

  set SearchKey(key: string) {
    this.searchKey = key;

    // perform user search
    this.searchForUser();
  }




  init() {
    if (this.loadUsers) {
      this.pageInfo.offset = 0;
      this.Users = [];
      this.loadAllUsers();
    }
  }

  loadAllUsers() {
    this.signals.setLoaderNonBlocking(true);
    this.userService.getUsers(this.pageInfo).subscribe((users: User[]) => {
      if (this.pageInfo.offset === 0) {
        // console.log('Setting users');
        this.Users = users;
      } else if (users?.length > 0 && !this.Users.includes(users[0])) {
        console.log(this.Users);
        console.log(users[0]);
        this.Users = this.Users.concat(users);
      }
      this.pageInfo.offset += this.Users.length;
      console.log(this.Users);
      this.signals.setLoaderNonBlocking(false);
    });
  }


  searchForUser() {
    this.pageInfo.offset = 0; // reset the paging information
    this.pageInfo.limit = 500; // display first 500 match items
    this.userService.searchUser(this.searchKey, this.pageInfo).subscribe((users: User[]) => {
      this.Users = users.reverse();
    })
  }

  loadMore($event: any) {
    if (this.action) {
      this.signals.sendAction(this.action);
    }
  }

  reload($event: any) {
    this.init();
  }

  onItemClicked($event: any) {
    this.selectedUser = $event;
    if (this.selectedUser) {
      this.userService.setSelectedUserLocal(this.selectedUser);
      this.selectedUserEvent.emit($event);
    }
  }


  onItemsSelected($event: any) {
    this.selectedUsers = $event;
    this.selectedUsersEvent.emit($event);
  }


  deleteUser($event: any) {
    this.selectedUser = $event;
    // this.userService.deleteUser('' + this.selectedUser.myUser.id).subscribe( _ => {
    //   this.reload(null);
    // });
  }


}
