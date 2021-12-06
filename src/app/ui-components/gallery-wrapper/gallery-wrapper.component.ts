import { environment } from 'src/environments/environment';
import { SignalService } from 'src/app/shared/services/signal.service';
import { Photo } from 'src/app/models';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GalleryConfig, GalleryItem, ImageItem, ImageItemData } from 'ng-gallery';
import { UtilityService } from 'src/app/shared/services';


@Component({
  selector: 'app-gallery-wrapper',
  templateUrl: './gallery-wrapper.component.html',
  styleUrls: ['./gallery-wrapper.component.css']
})
export class GalleryWrapperComponent implements OnInit, OnDestroy {
  private images: { id: any, src: string, thumb: string }[] = [];
  config: GalleryConfig = {
    dots: true,
    imageSize: 'cover',
    loop: true,
    autoPlay: true
  };

  images$?: Subscription;

  constructor(
    private signal: SignalService
  ) { }

  ngOnInit(): void {
    this.images$ = this.signal.imagesLoadedSource$.subscribe((photos: Photo[]) => {
      this.Images = photos;
      // console.log(photos);
    });

  }

  ngOnDestroy() {
    UtilityService.destroySubscription(this.images$);
  }


  @Input() set Images(photos: any[]) {
    this.images = [];
    if (photos?.length > 0) {
      photos?.forEach(ph => {
        const src = environment.file_api_download_url_root+ ph.source ?? '';
        const thumb = environment.file_api_download_url_root + ph.thumbnail ?? '';
        this.images.push({
          id: ph.id, src, thumb
        });
      });

      console.log(this.images);
    }
  }

  get Images() {
    return this.images as any;
  }
}
