import { Urls } from './config';
import { AdminService, USER_ROLE } from './shared/services';
// import { AdminService, USER_ROLES } from './shared/services/admin.service';

interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}



export class MyNavigator {
  isAdmin = true;
  isStudent = false;
  isLecturer = false;
  isHod = false;


  menu: NavData[] = [];

  adminMenu: NavData[] = [{
    name: 'Admin',
    url: '/app/admin-users/',
    icon: 'icon-wrench',
    children: [
      {
        name: 'Admin Users',
        url: '/app/admin-users/admin-users-list',
        icon: 'icon-user-follow'
      },
      {
        name: 'Roles',
        url: '/app/admin-users/manage-role',
        icon: 'icon-like'
      },
      {
        name: 'Lecturers',
        url: '/app/admin-users/lecture-list',
        icon: 'icon-people'
      },
      {
        name: 'Programme & Courses',
        url: '/app/admin-users/manage-programme',
        icon: 'icon-pencil'
      },
    ]
  },
 ];


  commonMenu: NavData = {
    name: 'Users',
    url: '/app/users/',
    icon: 'icon-people',
    children: [
      {
        name: 'All Users',
        url: '/app/users/all',
        icon: 'icon-pin'
      },
      {
        name: 'Create user',
        url: '/app/users/create-user',
        icon: 'icon-user-follow'
      },
    ]
  };





  constructor(
    private adminService: AdminService
  ) {
    this.menu = [{
      title: true,
      name: 'Navigation'
    },
    {
      name: 'Dashboard',
      url: Urls.home,
      icon: 'icon-speedometer'
    }];

    this.isAdmin = this.adminService.loggedUserHasRole(USER_ROLE.ADMIN);
    this.isStudent = this.adminService.loggedUserHasRole(USER_ROLE.STUDENT);
    this.isLecturer = this.adminService.loggedUserHasRole(USER_ROLE.LECTURER);
    this.isHod = this.adminService.loggedUserHasRole(USER_ROLE.HOD);
  }

  private adminLinks() {

    this.menu.push(this.commonMenu, ...this.adminMenu,);
    return this.menu;
  }


  private addStudentLinks() {

  }
  private addLecturerLinks() {

  }
  private addHodLinks() {

  }


  async links() {

    if (this.isAdmin) {
      // console.log('*******> creating admin links');
      return this.adminLinks();
    }
    else if (this.isLecturer) {
      return this.addLecturerLinks();
    } else if (this.isStudent) {
      return this.addStudentLinks();
    } else if (this.isHod) {
      return this.addHodLinks();
    }
    else {
      console.log('User permission denied');
      return;
    }
  }

}

// export const navItems: NavData[] = new MyNavigator().links;


