import { PhotoDisplayType } from './../../models/photo';
import { LocalStorageService } from 'angular-web-storage';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo, Video, VideoDisplayType } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private fstore: LocalStorageService) {
  }

  /////////////////////////////////////////////////////////////////////////
  /*************Photos endpoints*****/
  ///////////////////////////////////////////////////////////////////////////


  updatePhoto(photo: Photo) {
    delete photo.photoDisplayType;

    if (!photo?.id) {
      console.log('Photo to update must have an ID')
      return;
    }
    const url = `${environment.store_api_root_url}/photos/${photo.id}`
    return this.http.patch(url, photo).pipe(
      map(res => {
        return photo;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getStorePhotos(storeId: any) {
    if (!storeId) {
      console.log('Please select store')
      return;
    }
    const filter = {
      include: [
        { relation: 'photoDisplayType' }
      ]
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/photos?filter=${JSON.stringify(filter)}`
    return this.http.get<Photo[]>(url).pipe(
      map((res: Photo[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createStorePhoto(storeId: any, photo: Photo) {
    if (!storeId || !photo) {
      console.log('Store Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/photos`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteStorePhoto(storeId: string, photoId: string) {
    if (!storeId || !photoId) {
      console.log('Store id or photo id is invalid');
      return;
    }
    let filter: any = {
      id: photoId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/stores/${storeId}/photos${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getProductPhotos(productId: any) {
    if (!productId) {
      console.log('Please select product')
      return;
    }
    const filter = {
      include: [
        { relation: 'photoDisplayType' }
      ]
    }
    const url = `${environment.store_api_root_url}/products/${productId}/photos?filter=${JSON.stringify(filter)}`
    return this.http.get<Photo[]>(url).pipe(
      map((res: Photo[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createProductPhoto(productId: any, photo: Photo) {
    if (!productId || !photo) {
      console.log('Product Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/products/${productId}/photos`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteProductPhoto(productId: string, photoId: string) {
    if (!productId || !photoId) {
      console.log('product id or photo id is invalid');
      return;
    }
    let filter: any = {
      id: photoId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/products/${productId}/photos${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deletePhoto(photoId: any) {
    const url = `${environment.store_api_root_url}/photos/${photoId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createBrandPhoto(brandId: any, photo: Photo) {
    if (!brandId || !photo) {
      console.log('Product Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/product-brands/${brandId}/photo`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createProductCategoryPhoto(categoryId: any, photo: Photo) {
    if (!categoryId || !photo) {
      console.log('Product category Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/product-categories/${categoryId}/photo`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createProductCategoryItemPhoto(itemId: any, photo: Photo) {
    if (!itemId || !photo) {
      console.log('Product category item Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/product-category-items/${itemId}/photo`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createCouponPhoto(couponId: any, photo: Photo) {
    if (!couponId || !photo) {
      console.log('Coupon Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/coupons/${couponId}/photo`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createStoreCategoryPhoto(storeCatId: any, photo: Photo) {
    console.log(photo);
    if (!storeCatId || !photo) {
      console.log('Store category Id or Photo object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/store-categories/${storeCatId}/photo`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  /////////////////////////////////////////////////////////////////////////
  /*************Photo Display Types*****/
  ///////////////////////////////////////////////////////////////////////////

  createPhotoDisplayType(photoDisplayType: PhotoDisplayType) {
    console.log(photoDisplayType);
    const url = `${environment.store_api_root_url}/photo-display-types`
    return this.http.post<PhotoDisplayType>(url, photoDisplayType).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deletePhotoDisplayType(displayTypeId: any) {
    if (!displayTypeId) {
      console.log('Policy type ID cannot be undefined');
      return;
    }
    const url = `${environment.store_api_root_url}/photo-display-types/${displayTypeId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getPhotoDisplayTypes() {
    const url = `${environment.store_api_root_url}/photo-display-types`
    return this.http.get<PhotoDisplayType[]>(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Video endpoints*****/
  ///////////////////////////////////////////////////////////////////////////


  updateVideo(vid: Video) {
    if (!vid?.id) {
      console.log('Photo to update must have an ID')
      return;
    }
    const url = `${environment.store_api_root_url}/videos/${vid.id}`
    return this.http.patch(url, vid).pipe(
      map(res => {
        return vid;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getStoreVideos(storeId: any) {
    if (!storeId) {
      console.log('Please select store')
      return;
    }
    const filter = {
      include: [
        { relation: 'videoDisplayType' }
      ]
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/videos?filter=${JSON.stringify(filter)}`
    return this.http.get<Photo[]>(url).pipe(
      map((res: Photo[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createStoreVideo(storeId: any, video: Video) {
    if (!storeId || !video) {
      console.log('Store Id or Video object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/videos`
    return this.http.post<Video>(url, video).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteStoreVideo(storeId: string, videoId: string) {
    if (!storeId || !videoId) {
      console.log('Store id or video id is invalid');
      return;
    }
    let filter: any = {
      id: videoId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/stores/${storeId}/videos${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteVideo(videoId: any) {
    const url = `${environment.store_api_root_url}/videos/${videoId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getProductVideos(productId: any) {
    if (!productId) {
      console.log('Please select product')
      return;
    }
    const filter = {
      include: [
        { relation: 'videoDisplayType' }
      ]
    }
    const url = `${environment.store_api_root_url}/products/${productId}/videos?filter=${JSON.stringify(filter)}`
    return this.http.get<Photo[]>(url).pipe(
      map((res: Photo[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createProductVideo(productId: any, video: Video) {
    if (!productId || !video) {
      console.log('product Id or Video object is invalid');
      return;
    }
    const url = `${environment.store_api_root_url}/products/${productId}/videos`
    return this.http.post<Video>(url, video).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteProductVideo(productId: string, videoId: string) {
    if (!productId || !videoId) {
      console.log('Product id or video id is invalid');
      return;
    }
    let filter: any = {
      id: videoId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/products/${productId}/videos${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Video Display Types*****/
  ///////////////////////////////////////////////////////////////////////////
  createVideoDisplayType(videoDisplayType: VideoDisplayType) {
    console.log(videoDisplayType);
    const url = `${environment.store_api_root_url}/video-display-types`
    return this.http.post<VideoDisplayType>(url, videoDisplayType).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteVideoDisplayType(displayTypeId: any) {
    if (!displayTypeId) {
      console.log('Policy type ID cannot be undefined');
      return;
    }
    const url = `${environment.store_api_root_url}/video-display-types/${displayTypeId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getVideoDisplayTypes() {
    const url = `${environment.store_api_root_url}/video-display-types`
    return this.http.get<VideoDisplayType[]>(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  handleError(e: any) {
    console.log(e);
    const message = '';
    if (e.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', e.error.message);
      console.log('No connection');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${e.status}, ` + `body was: ${e.code}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('System error, please report to: admin@kejettia.com');
  }
}
