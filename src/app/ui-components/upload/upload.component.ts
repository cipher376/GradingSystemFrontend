import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UtilityService, MyAuthService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { DialogComponent, dialogType } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() requiredFileType?: string = 'image/*'

  fileName = '';
  uploadProgress: number[] = [];
  uploadSub: Subscription[] = [];
  files?: FileList;

  @Input() uploadButtonMessage = 'Upload';
  @Input() maximumUploads = 1;

  @Input() uploadUrl = '';

  @Output() uploadedFiles = new EventEmitter<any>();
  @Output() uploadedFile = new EventEmitter<any>();


  @ViewChild(DialogComponent, { static: false })
  private confirmUploadDialog?: DialogComponent;

  constructor(
    private http: HttpClient,
    private auth: MyAuthService,
    private toaster: ToastrService,
    private signal: SignalService
  ) {
    if (this.requiredFileType?.search('image') || this.requiredFileType?.search('video')) {
      this.uploadUrl = this.uploadUrl ?? (environment.file_api_upload_photo_video_url_root);
    } else {
      this.uploadUrl = this.uploadUrl ?? (environment.file_api_upload_url_root);
    }
    console.log(this.uploadUrl);
  }


  ngOnInit() {
  }

  onFileSelected(event: any) {
    this.files = event.target.files;
    if (this.files && this.files.length > 0) {
      this.confirmUpload();
    }
  }

  cancelUpload(index?: number) {
    if (!index) {
      // cancel all uploads
      this.uploadSub.forEach(sub => {
        sub.unsubscribe();
      });
      this.reset();
    } else {
      this.uploadSub[index].unsubscribe();
      this.uploadSub[index] = undefined as any;
    }
  }

  reset() {
    this.uploadProgress = [];
    this.uploadSub = [];
  }

  upload() {
    console.log(this.files)
    if (!this.files) {
      return;
    }
    for (let index = 0; index < this.files?.length; index++) {

      this.fileName = UtilityService.generateUniqueFileName(this.files[index].name);
      const file = new File([this.files[index]], this.fileName, {
        lastModified: this.files[index].lastModified,
        type: this.files[index].type,
      });
      const formData = new FormData();
      formData.append(this.fileName, file);

      const headers = new HttpHeaders({
        boundary: '---------------------------293582696224464',
        ['Authorization']: 'Bearer ' + this.auth.getToken().token
      });

      const upload$ = this.http.post(this.uploadUrl, formData, {
        headers,
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => {
            this.reset();
          })
        );

      this.uploadSub[index] = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress[index] = Math.round(100 * (event.loaded / (event?.total || 1)));
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
          const body: any = event.body;
          // this.signal.announceUploadComplete(body?.files);
          this.uploadedFile.emit(body?.files);
          this.uploadedFiles.emit(body?.files);
        }
      }, error => {
        console.log(error);
        this.toaster.error('Something went wrong!')
      })
    }

  }


  confirmUpload() {
    // TODO:console.log(this.files);
    setTimeout(() => {
      this.confirmUploadDialog?.showConfirm(`Are you sure you want to upload?`,
        'Attention!', 'No', 'Yes', 'md', dialogType.warning);
    }, 500);

  }


  applyAction($action: any) {
    console.log($action);
    if ($action) {
      // uploading photo
      this.upload();
    } else {
      this.cancelUpload();
    }
  }

}
