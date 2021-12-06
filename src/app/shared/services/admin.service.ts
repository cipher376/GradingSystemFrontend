import { SignalService } from 'src/app/shared/services/signal.service';
import { Urls } from './../../config';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

import { MyLocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { UtilityService } from '.';
import { RolePolicy, Role } from 'src/app/models/role-policy';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { environment } from 'src/environments/environment';

export enum USER_ROLE {
  ADMIN='ADMIN',
  STUDENT='STUDENT',
  LECTURER = 'LECTURER',
  HOD = 'HOD'
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(
    private store: MyLocalStorageService,
    private http: HttpClient,
  ) {
  }


  // Returns IDs for  all privilege users
  getUsersIds(): any {
    const filter = {
      order: 'id DESC',
      fields: { id: true }
    };
    const url = environment.api_root_url + '/users?filter=' + JSON.stringify(filter);
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        const UIds: string[] = [];
        res.forEach(user => {
          UIds.push('u' + user.id);
        });
        return UIds as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getAdminUsersIds(): any {
    const filter = {
      order: 'id DESC',
      // fields: { id: true }
    };
    const url = environment.api_root_url + '/admin/users?filter=' + JSON.stringify(filter);
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        const UIds: string[] = [];
        res.forEach(user => {
          UIds.push('u' + user.id);
        });
        return UIds as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  countPolicies(): any {
    return this.http.get<RolePolicy[]>(environment.api_root_url + '/count-policies').pipe(
      map(res => {
        if (res) {
          // this.signals.announcePoliciesCount(res as any);
          return (res as any);
        }
        return 0;
      }),
      catchError(e => this.handleError(e))
    );
  }

  countRoles(): any {
    return this.http.get<RolePolicy[]>(environment.api_root_url + '/count-roles').pipe(
      map(res => {
        if (res) {
          // this.signals.announceRolesCount(res as any);
          return (res as any);

        }
        return 0;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getPolicies(pageInfo?: PageInfo, filter: any = {}): any {
    if (pageInfo) {
      filter = {
        offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.api_root_url + '/get-all-policy' + filter;
    // // console.log(url);
    return this.http.get<RolePolicy[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getRoles(): any {
    const url = environment.api_root_url + '/get-all-roles';
    // // console.log(url);
    return this.http.get<string[][]>(url).pipe(
      map(res => {
        console.log(res);
        // const policies: RolePolicy[] = [];
        // // response is in array
        // res.forEach(p => {
        //   policies.push(new RolePolicy({ subject: p[0], role: p[1] }));
        // });
        // return policies as any;
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getGroupPolicies(pageInfo?: PageInfo, filter: any = {}): any {
    if (pageInfo) {
      filter = {
        // offset: pageInfo.offset * pageInfo.limit,
        skip: pageInfo.offset,
        limit: pageInfo.limit
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.api_root_url + '/get-group-policy' + filter;
    // // console.log(url);
    return this.http.get<RolePolicy[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createUpdatePolicy(policy: RolePolicy): Observable<any> {
    if (policy?.id) {
      return this.updatePolicy(policy);
    } else {
      return this.addPolicy(policy);
    }
  }

  addPolicy(policy: RolePolicy): Observable<any> {
    if (!policy.subject || !policy.ptype || !policy.object) {
      console.log('Invalid policy object');
      return policy as any;
    }
    return this.http.post<RolePolicy>(environment.api_root_url + '/add-policy', policy).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  updatePolicy(policy: RolePolicy): Observable<any> {
    if (!policy.subject || !policy.ptype || !policy.object) {
      console.log('Invalid policy object');
      return policy as any;
    }
    return this.http.patch<RolePolicy>(environment.api_root_url + '/update-policy', policy).pipe(
      map(res => {
        return policy;
      }),
      catchError(e => this.handleError(e))
    );
  }


  addRole(policy: RolePolicy): any {
    if (!policy.subject || !policy.ptype || !policy.role) {
      console.log('Invalid policy object');
      return policy as any;
    }
    return this.http.post<RolePolicy>(environment.api_root_url + '/add-grouping-policy', policy).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  addRoles(policies: RolePolicy[]): any {
    return this.http.post<RolePolicy[]>(environment.api_root_url + '/add-named-grouping-policies', policies).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getPolicySubjects(): any {
    return this.http.get<string[]>(environment.api_root_url + '/get-all-subjects').pipe(
      map(res => {
        // console.log(res);
        return (res as any);
      }),
      catchError(e => this.handleError(e))
    );
  }

  deletePolicy(policy: RolePolicy): any { // return observable<boolean>
    return this.http.post<boolean>(environment.api_root_url + '/remove-policy', policy).pipe(
      map(res => {
        // console.log(res);
        return (res as any);
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteRole(policy: RolePolicy): any {  // return observable<boolean>
    return this.http.post<boolean>(environment.api_root_url + '/remove-grouping-policy', policy).pipe(
      map(res => {
        // console.log(res);
        return (res as any);
      }),
      catchError(e => this.handleError(e))
    );
  }


  getUserRoles(userId: any): any { // returns Observable<string[]>
    return this.http.post<string[][]>(environment.api_root_url + '/get-filtered-group-policy', { 'subject': 'u' + userId }).pipe(
      map(res => {
        const userPolicies: string[] = [];
        const policies = res as string[][];
        policies.forEach(p => {
          userPolicies.push(p[1]);
        });
        this.setUserPoliciesLocal(userPolicies);
        return userPolicies as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /*************** Grading system user roles*************** */
  addUserToRole(role: string, userId: any) {
    this.http.post<Role>(environment.api_root_url + `/users/${userId}/role`, { role, userId }).pipe(
      map(res => {
        console.log(res.role)
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUserRolesGrading(userId: any) {
    return this.http.get<Role>(environment.api_root_url + `/users/${userId}/role`).pipe(
      map(res => {
        console.log(res)
        const userPolicies: string[] = [res?.role || ''];
        this.setUserPoliciesLocal(userPolicies);
        return userPolicies as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /****************************
   * ******Local services******
   ****************************/

  async setUserPoliciesLocal(policies: string[]) {
    await this.store.setObject('currentUserPolicies', policies);
  }
  async getUserPoliciesLocal(): Promise<string[]> {
    return await this.store.getObject('currentUserPolicies');
  }


  selectedUserHasRole(role: USER_ROLE) {
    const userRoles: string[] = this.store.getObjectSync('selected_user_roles');
    return userRoles?.includes(role)
  }

  loggedUserHasRole(role: USER_ROLE) {
    const userRoles: string[] = this.store.getObjectSync('logged_user_roles');
    // console.log(userRoles);
    return userRoles?.includes(role)
  }


  /***********Create new roles************ */
  createRole(role: Role) {


  }




  async deleteRoleMap(roleId: any, userId: any) {

  }


  async getRolesLocal() {
    return await this.store.getObject('roles');
  }

  async getRoleMapsLocal() {
    return await this.store.getObject('roleMaps');
  }

  async getRoleMapLocal(roleId: any, userId: any) {

  }


  setHomeUrl() {
    if (this.loggedUserHasRole(USER_ROLE.ADMIN)) {
      Urls.home = '/app/dashboard/admin-dashboard';
    } else if (this.loggedUserHasRole(USER_ROLE.STUDENT)) {
      Urls.home = '/app/dashboard/manager-dashboard';
    } else if (this.loggedUserHasRole(USER_ROLE.LECTURER)) {
      Urls.home = '/app/dashboard/company-manager-dashboard';
    } else if (this.loggedUserHasRole(USER_ROLE.HOD)) {
      Urls.home = '/app/dashboard/seller-dashboard';
    } else {
      Urls.home = '/auth/login';
    }
  }


  getSelectedPolicyLocal() {
    return this.store.getObjectSync('selected_policy');
  }
  setSelectedPolicyLocal(policy: RolePolicy) {
    this.store.setObjectSync('selected_policy', policy);
  }

  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }


}
