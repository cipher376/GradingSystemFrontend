import { User } from 'src/app/models';
// import { MessageService } from './../../shared/services/message.service';
// import { UserService } from './../../shared/services/user.service';
// import { SignalService, MY_ACTION } from './../../shared/services/signal.service';
import { Component, OnDestroy, Inject, AfterViewInit, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import { MyNavigator, NavData } from '../../_nav';
// import { MyAuthService } from '../../shared/services/my-auth.service';
import { Router } from '@angular/router';
// import { UtilityService } from '../../shared/services/utility.service';
// import { AdminService, USER_ROLES } from '../../shared/services/admin.service';
// import { MyUser, Profile } from '../../shared/identity-sdk';
import { environment } from '../../../environments/environment';
import { NO_USER_IMAGE, Urls } from '../../config';
import { MyNavigator } from 'src/app/nav';
import { AdminService, MyAuthService, UserService, USER_ROLE } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public navItems: any;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  signal$: any;
  currentYear = new Date(Date.now()).getFullYear();


  loggedUser: User = new User();

  isAdmin = false;

  homeUrl = Urls.home;
  receivedMessageCount = 0;

  constructor(private _router: Router,
    private auth: MyAuthService,
    private adminService: AdminService,
    private userService: UserService,
    private signal: SignalService,
    @Inject(DOCUMENT) _document?: any,
  ) {

    setTimeout(() => {
      new MyNavigator(adminService).links().then(data => {
        this.navItems = data;
      });
    }, 200);

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.signal$ = this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.rolesLoaded || action === MY_ACTION.roleMapsLoaded) {
        setTimeout(() => {
          new MyNavigator(this.adminService).links().then(data => {
            this.navItems = data;
          });

        }, 2000);
        console.log('Loading links from signal');
      }
    });

  }
  ngOnInit() {

  }

  async ngAfterViewInit() {
    this.loggedUser = await this.userService.getLoggedUserLocal();
    this.isAdmin = await this.adminService.loggedUserHasRole(USER_ROLE.ADMIN);
    // if (this.loggedUser?.email)
      // this.messageService.countNewMessage(this.loggedUser?.email)?.subscribe(_ => { });
  }

  ngOnDestroy() {
    this.changes?.disconnect();
    this.signal$?.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

  lock() {
    this._router.navigate([
      'auth/lock'
    ]);
  }

  async goToUser() {
    this.userService.setSelectedUserLocal(this.loggedUser).then(() => {
      this._router.navigateByUrl('app/users/user-details');
    })
  }


  getUserPhoto() {
    if (this.loggedUser.profilePhoto)
      return environment.file_api_download_url_root + (this.loggedUser.profilePhoto?.thumbnail ?? this.loggedUser.profilePhoto?.source);
    return NO_USER_IMAGE;
  }

}
