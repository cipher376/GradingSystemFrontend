import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { MyLocalStorageService, UtilityService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { t, Schema, addCustomTypes } from 'typy';
import { DialogComponent, dialogType } from '../dialog/dialog.component';

export interface DataTableColumns {
  label: string;
  path: string; // property path of nested object properties
}

export enum DataDisplayOrder {
  asc = 1,
  desc = 2
}

export enum TableType {
  mini = 1,
  medium = 2,
  normal = 3
}

export interface NgSelectElement { label: string, value: string, disabled: boolean }
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  isSearch = false;
  searchKey = '';
  searchTimeOut: any;
  foundItems: any[] = [];

  items: any[] = [];
  groupIndex = 1;
  groups: number[] = [];
  _groupSize: number = 25;

  selectedItems: any[] = [];
  currentSelectedItem: any;
  itemsSelectedState: boolean[] = [];

  @Input() title = 'No title';

  @Input() tableColumns: DataTableColumns[] = [];
  @Input() dataDisplayOrder = DataDisplayOrder.desc;

  @Input() itemProperties = [];
  @Input() action = false;
  @Input() selectAll = false;
  @Input() disableSearch = false;


  data: any = [];

  @Output() more = new EventEmitter<boolean>();
  @Output() reload = new EventEmitter<boolean>();

  @Output() selectItem = new EventEmitter<any>();
  @Output() selectItems = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  _allChecked = false;

  @ViewChild(DialogComponent, { static: false })
  private dialog?: DialogComponent;

  rand = 0;

  constructor(
    private _signalService: SignalService,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.rand = Math.floor((Math.random() * 1000) + 1);
  }

  next() {
    if (this.groupIndex < this.groups[this.groups.length - 1]) {
      this.groupIndex += 1;
    }
    this.move(this.groupIndex);
  }

  previous() {
    if (this.groupIndex > 1) {
      this.groupIndex -= 1;
    }
    this.move(this.groupIndex);
  }

  start() {
    this.move(1);
  }

  end() {
    this.move(this.groups[this.groups.length - 1]);
  }

  move(index: number = 1) {
    if (index) {
      this.groupIndex = index;
    }
    setTimeout(() => {
      const start = (this.groupIndex * this.groupSize) - this.groupSize;
      const end = this.groupIndex * this.groupSize;
      this.items = this.data.slice(start, end);
    });

  }

  set groupSize(size: number) {
    this._groupSize = size;
    this.calculateGroups();
  }

  get groupSize() {
    return this._groupSize;
  }

  @Input()
  set tableData(data: any[]) {
    // console.log(data);
    this.data = data || [];
    if (this.dataDisplayOrder === DataDisplayOrder.desc) {
      // change the order of the table to descending, higher keys come first
      this.data = this.data.reverse();
    }
    this.data.forEach((d: any, i: any) => {
      this.itemsSelectedState.push(false);
    });
    // console.log(this.data);
    this.calculateGroups();
  }

  calculateGroups() {
    const temp: any = [];
    for (let i = 0; i < (this.data.length / this._groupSize); i++) {
      temp.push(i + 1);
    }
    setTimeout(() => {
      this.groups = temp;
      this.move();
    });
  }

  onSearch() {
    if (this.searchTimeOut) { clearTimeout(this.searchTimeOut); }
    this.searchTimeOut = setTimeout(() => {
      // perform search
      // console.log(this.searchKey);
      if (this.searchKey) {
        this.searchKey = this.searchKey.trim().toLowerCase();
        this.util.setSearchKey(this.searchKey);
        this._signalService.sendAction(MY_ACTION.searchKeyChanged)
      } else {
        // restore table
        this.start();
      }
    }, 300);
  }

  loadMore() {
    this.more.emit(true);
    this.allChecked = false;
  }

  refresh() {
    this.reload.emit(true);
  }

  itemSelected(item: any) {
    this.selectItem.emit(item);
    setTimeout(() => {
      this.currentSelectedItem = item;
    });
  }

  // selectItems() {
  //   this.selectItem.emit(this.selectedItems);
  // }

  set currentItemState(state: boolean) {

  }

  inSelectedItems(item: any) {
    for (const i of this.selectedItems) {
      if (item.id === i.id) {
        return true;
      }
    }
    return false;
  }

  addRemoveSelectedItems(item: any) {
    if (this.allChecked) {
      setTimeout(() => {
        this.allChecked = false;
        this.selectedItems = [];
      });
      return;
    }
    if (!this.inSelectedItems(item)) { // not in selected items
      this.selectedItems.push(item);
    } else {
      // remove
      this.selectedItems = this.selectedItems.filter((i) => {
        if (i.id !== item.id) {
          return true;
        } else {
          return false;
        }
      });
    }
    this.selectItems.emit(this.selectedItems);
    // console.log(this.selectedItems);
  }

  set allChecked(checked: boolean) {
    this._allChecked = checked;
    // console.log(checked);
    if (checked) {
      setTimeout(() => {
        this.selectedItems = this.items;
      });
    } else {
      // clear
      this.selectedItems = [];
    }
    // console.log(this.selectedItems);
    this.selectItems.emit(this.selectedItems);
  }
  get allChecked() {
    return this._allChecked;
  }


  getPropValue(item: any, prop: DataTableColumns) {
    return t(item, prop.path).safeObject;
  }


  itemDelete() {
    // console.log(this.currentSelectedItem);
    this.deleteItem.emit(this.currentSelectedItem);

  }

  showDeleteDialog(item: any) {
    this.addRemoveSelectedItems(item);
    this.currentSelectedItem = item;
    // console.log(item);
    this.dialog?.showDeleteDialog();
  }

  applyAction($action: any) {
    console.log($action);
    if ($action) {
      this.itemDelete();
    }
  }

}
