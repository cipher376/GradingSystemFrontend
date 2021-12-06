import { MyFile } from './../../models/file';
import { Injectable } from '@angular/core';
// import { FileItem } from '@wkoza/ngx-upload';
import { Subject } from 'rxjs';
import { LatLng, Photo } from 'src/app/models';


export enum MY_ACTION {
  unknown = 0, // used as a confirm signal for dialogs

  loadAllStores = 1.1,
  loadStoresByCountry = 1.2, // selectedStoreAddress: StoreAddress should be set via localStorage
  loadStoresByState = 1.3, // selectedStoreAddress should be set
  loadStoresBySuburb = 1.4, //  selectedStoreAddress should be set
  loadStoresBySeller = 1.5,
  loadStoresByManager = 1.6,
  reloadStores = 1.7,
  reloadStore = 1.71,
  storesLoaded = 1.8,
  loadSellers = 1.9,
  loadCompanyManagers = 1.10,


  // Product categories
  loadAllProductCategories = 2.1,
  loadProductCategoriesByStore = 2.2, // selectedStore
  reloadProductCategories = 2.3,
  productCategoriesLoaded = 2.4,

  // Data table actions
  delete = 3.1,

  // Product Items
  reloadProductItems = 4.1,
  loadAllProducts = 4.2,
  loadProductsByStore = 4.3, // selectedStore set via local storage
  loadProductsByCategory = 4.4, // selectedProductCategory set via local storage
  productsLoaded = 4.5,

  reloadUser = 5.1, // selected user but not currently logged user
  reloadUsers = 5.2,
  userLoaded = 5.3,
  usersLoaded = 5.4,
  loadAdminUsers = 5.5,
  loadAllUsers = 5.6,
  loadUsersByCountry = 5.7, // set country
  loadUsersByState = 5.8, // set country and state
  loadUsersByCity = 5.9, // set country, state, city
  loadStoreManagers = 5.10,

  rolesLoaded = 6.1,
  roleMapsLoaded = 6.2,
  reloadRoles = 6.3,
  reloadRoleMaps = 6.4,
  loadAllRoles = 6.5,
  rolePoliciesLoaded = 6.6,
  reloadRolePolicies = 6.7,
  loadAllRolePolicies = 6.8,

  reloadCompanies = 7.1,
  loadAllCompanies = 7.2,
  loadCompaniesByCountry = 7.3,
  loadCompaniesByState = 7.4,
  loadCompaniesBySuburb = 7.5,
  CompaniesLoaded = 7.6,
  companyChanged = 7.7,
  loadAllCompanyServices = 7.8,
  reloadCompanyServices = 7.9,
  companyServiceChanged = 7.10,
  loadCompanyPhotos = 7.11,

  projectChanged = 8.0,
  loadAllCompanyProjects = 8.1,
  reloadCompanyProjects = 8.2,

  loadAllCompanyAwards = 9.0,
  reloadCompanyAwards = 9.1,
  companyAwardChanged = 9.2,

  loadContract = 10.0,
  reloadContract = 10.1,
  contractAccepted = 10.2,
  loadAllCompanyContracts = 10.3,
  reloadCompanyContracts = 10.4,
  companyContractChanged = 10.5,


  ordersLoaded = 11.0,
  loadAllOrders = 11.1,
  loadPendingOrders = 11.2,
  loadProcessedOrders = 11.3,
  loadIncompleteOrders = 11.4,
  reloadOrders = 11.5,
  OrderUpdated = 11.6,

  employeesLoaded = 12.0,

  loadAllTransactions = 13.0,
  reloadTransactions = 13.1,

  // Messages signals
  markAsRead = 14.0,
  markAsUnRead = 14.1,

  // search key
  searchKeyChanged = 15.0,

}

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private _actionSource = new Subject<MY_ACTION>();
  _action$ = this._actionSource.asObservable();


  private locationChangeSource = new Subject<LatLng>();
  locationChangeSource$ = this.locationChangeSource.asObservable();

  private uploadCompleteSource = new Subject<MyFile[]>();
  uploadCompleteSource$ = this.uploadCompleteSource.asObservable();

  private imagesLoadedSource = new Subject<Photo[]>();
  imagesLoadedSource$ = this.imagesLoadedSource.asObservable();

  // private videosLoadedSource = new Subject<Video[]>();
  // videosLoadedSource$ = this.videosLoadedSource.asObservable();


  private dialogActionSource = new Subject<boolean>();
  dialogActionSource$ = this.dialogActionSource.asObservable();

  private loaderNonBlockingSource = new Subject<boolean>();
  loaderNonBlockingSource$ = this.loaderNonBlockingSource.asObservable();

  private loaderBlockingSource = new Subject<boolean>();
  loaderBlockingSource$ = this.loaderBlockingSource.asObservable();

  constructor() { }


  sendAction(action: MY_ACTION) {
    console.log(action);
    this._actionSource.next(action);
  }

  announceLocationChange(latLng: LatLng) {
    this.locationChangeSource.next(latLng);
  }

  announceUploadComplete(files: MyFile[]) {
    this.uploadCompleteSource.next(files);
  }

  announceImagesLoaded(photos: Photo[]) {
    this.imagesLoadedSource.next(photos);
  }
  // announceVideosLoaded(videos: Video[]) {
  //   this.videosLoadedSource.next(videos);
  // }

  announceDialogAction(action: boolean){
    this.dialogActionSource.next(action);
  }

  setLoaderNonBlocking(action: boolean){
    this.loaderNonBlockingSource.next(action);
  }

  setLoaderBlocking(action: boolean){
    this.loaderBlockingSource.next(action);
  }

  // announceNewMessageBatchNumber(batch: number) {
  //   this.messageGroupBatchNumberSource.next(batch);
  // }

}
