import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';

export enum dialogType {
  info = 1,
  warning = 2,
  normal = 3,
  success = 4,
  danger = 6,
  primary = 5
}

export enum dialogSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @ViewChild('dialog', { static: false }) public dialog?: ModalDirective;
  message = '';
  title = '';
  size = 'sm'; // or lg
  type: dialogType = dialogType.normal;
  confirm = false;

  cancelBtnMessage = '';
  actionBtnMessage = '';

  act?: any;


  @Output() actionEvent = new EventEmitter<any>();



  constructor(
    private signal: SignalService
  ) { }

  ngOnInit() {
  }

  show(message: string, title: string, size = 'sm', type = dialogType.normal) {
    this.message = message;
    this.title = title;
    this.size = size;
    this.type = type;
    this.confirm = false;
    this.dialog?.show();
  }

  showConfirm(message: string, title: string, cancelBtnMessage = '', actionBtnMessage = '', size = 'sm',
    type = dialogType.normal, action = false) {
    this.confirm = true;
    this.message = message;
    this.title = title;
    this.size = size;
    this.type = type;
    this.cancelBtnMessage = cancelBtnMessage;
    this.actionBtnMessage = actionBtnMessage;
    this.act = action;
    this.dialog?.show();
  }

  showDeleteDialog(btnSize = 'sm') {
    this.showConfirm('Are you sure you want to delete?', 'Attention!', 'No', 'Yes',
      btnSize, dialogType.danger);
  }

  broadcastAction() {
    this.act = true;
    this.actionEvent.emit(this.act);
    // this.signal.announceDialogAction(true);
      this.dialog?.hide();
  }

  cancelAction() {
    this.act = false;
    this.actionEvent.emit(this.act);
    // this.signal.announceDialogAction(false);
    this.dialog?.hide();
  }

}
