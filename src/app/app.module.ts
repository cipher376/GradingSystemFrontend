
import { ScreenLockGuardService } from './shared/services/guards/screenlock-guard.service';
import { SuperAdminGuardService } from './shared/services/guards/superadmin-guard.service';
import { AuthGuardService } from './shared/services/guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AngularWebStorageModule } from 'angular-web-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './pages/public/auth/auth.module';
import { P404Component } from './pages/public/error/404.component';
import { P500Component } from './pages/public/error/500.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './shared/services';
import { ToastrModule } from 'ngx-toastr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';
import { ConfirmModalComponent } from './ui-components/confirm-modal/confirm-modal.component';
import { LoaderNonBlockingComponent } from './ui-components/loader-non-blocking/loader-non-blocking.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


@NgModule({
  declarations: [
    AppComponent,
    // ...APP_CONTAINERS,
    DefaultLayoutComponent,
    P404Component,
    P500Component,
    ConfirmModalComponent,
    LoaderNonBlockingComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    AngularWebStorageModule,
    // NgMultiSelectDropDownModule.forRoot()
    NgxGalleryModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SimpleModalModule.forRoot({ container: document.body }, {
      ...defaultSimpleModalOptions, ...{
        closeOnEscape: true,
        closeOnClickOutside: true,
        // wrapperDefaultClasses: 'o-modal o-modal--fade',
        // wrapperClass: 'o-modal--fade-in',
        animationDuration: 300,
        autoFocus: true
      }
    }),

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ThemeService,
    httpInterceptorProviders,
    AuthGuardService,
    SuperAdminGuardService,
    ScreenLockGuardService,
  ],
  entryComponents:[
    ConfirmModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
