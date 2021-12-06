import { SignalService } from 'src/app/shared/services/signal.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery-9';
import { UtilityService } from 'src/app/shared/services';
import { Photo } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-wrapper2',
  templateUrl: './gallery-wrapper2.component.html',
  styleUrls: ['./gallery-wrapper2.component.css']
})
export class GalleryWrapper2Component implements OnInit {
  images: NgxGalleryImage[] = [];
  config: NgxGalleryOptions[];

  images$?: Subscription;

  constructor(
    private signal: SignalService
  ) {

    this.config = [
      // {
      //   width: '600px',
      //   height: '400px',
      //   thumbnailsColumns: 4,
      //   imageAnimation: NgxGalleryAnimation.Slide
      // },
      // max-width 800
      {
        // breakpoint: 800,
        width: '100%',
        height: '600px',
        // imagePercent: 80,
        // thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsColumns: 4
        // preview: false
      },
      // max-width 400
      // {
      //   breakpoint: 400,
      //   preview: false
      // }
    ];
  }


  ngOnInit(): void {
    this.images$ = this.signal.imagesLoadedSource$.subscribe(photos => {
      this.Images = photos;
      console.log(photos);
    });

  }

  ngOnDestroy() {
    UtilityService.destroySubscription(this.images$);
  }


  set Images(photos: Photo[]) {
    this.images = [];
    if (photos?.length > 0) {
      photos?.forEach(ph => {
        this.images.push(
          {
            small: environment.file_api_download_url_root + ph.thumbnail ?? '',
            medium: environment.file_api_download_url_root + ph.source ?? '',
            big: environment.file_api_download_url_root + ph.source ?? '',
            description: ph.description
          });
      });
    }
  }

}
