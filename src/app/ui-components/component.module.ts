
import { SelectUserDialogComponent } from 'src/app/ui-components/select-user-dialog/select-user-dialog.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { RoleListComponent } from '../pages/private/admin/role-list/role-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { CreateUserProfileComponent } from './create-user-profile/create-user-profile.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgxGalleryModule } from 'ngx-gallery-9';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SelectModule } from 'ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

// import { DataTablesModule } from 'angular-datatables';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserAddressComponent } from './create-user-address/create-user-address.component';
import { DataTableComponent } from './data-table/data-table.component';
import { UploadComponent } from './upload/upload.component';
import { RolePillsComponent } from './role-pills/role-pills.component';
import { UserToRoleComponent } from './user-to-role/user-to-role.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { CreateAddressComponent } from './create-address/create-address.component';
;
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GalleryWrapperComponent } from './gallery-wrapper/gallery-wrapper.component';
import { SafeUrlPipe, SafeStylePipe } from '../shared/pipes/pipe';
import { GalleryWrapper2Component } from './gallery-wrapper2/gallery-wrapper2.component';
import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule } from 'ng-gallery';
import { IconsComponent } from './icons/icons.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderBlockingComponent } from './loader-blocking/loader-blocking.component';
import { CreateProgrammeComponent } from './create-programme/create-programme.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AssignCourseProgrammeComponent } from './assign-course-programme/assign-course-programme.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    CreateUserComponent,
    CreateUserAddressComponent,
    CreateUserProfileComponent,
    DataTableComponent,
    DialogComponent,
    UploadComponent,
    RoleListComponent,
    RolePillsComponent,
    UserToRoleComponent,
    UserRolesComponent,
    CreateAddressComponent,
    GalleryWrapperComponent,
    GalleryWrapper2Component,
    SafeUrlPipe,
    SafeStylePipe,
    SelectUserDialogComponent,
    IconsComponent,
    LoaderComponent,
    LoaderBlockingComponent,
    CreateProgrammeComponent,
    CreateCourseComponent,
    AssignCourseProgrammeComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    RouterModule,
    NgxGalleryModule,
    GalleryModule,
    LightboxModule,
    TabsModule,
    SelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDropzoneModule,
    TooltipModule.forRoot()
  ],
  exports: [
    UserListComponent,
    UserDetailComponent,
    CreateUserComponent,
    CreateUserProfileComponent,
    CreateUserAddressComponent,
    DataTableComponent,
    DialogComponent,
    UserToRoleComponent,
    RoleListComponent,
    CreateAddressComponent,
    GalleryWrapperComponent,
    GalleryWrapper2Component,
    SafeUrlPipe,
    SafeStylePipe,
    SelectUserDialogComponent,
    IconsComponent,
    LoaderBlockingComponent,
    LoaderComponent,
    CreateProgrammeComponent,
    CreateCourseComponent,
    AssignCourseProgrammeComponent,

  ],
  providers: [
    SafeUrlPipe,
    SafeStylePipe,
  ]
})
export class ComponentModule { }
