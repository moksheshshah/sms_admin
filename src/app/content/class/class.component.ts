import { Component, ViewChild } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../common/global-function';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from './class.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditClassComponent } from './add-edit-class/add-edit-class.component';
import { CONSTANTS } from '../../common/constants';

export interface SizeElement {
  class_name: string;
  section: string;
  total_std: string;
  action: any;
}

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent {
  isTableLoading: boolean = false;
  SIZE_DATA: SizeElement[] = [];
  totalSizeData: any;
  searchSize: any = "";
  displayedColumns: string[] = ['class_name', 'section', 'total_std', 'action'];
  sizeData = new MatTableDataSource<SizeElement>(this.SIZE_DATA);
  selection = new SelectionModel<SizeElement>(true, []);
  name: string = "";
  @ViewChild(MatSort, { static: false }) sizeSort!: MatSort;
  pageNo: any;
  limit: any;
constants: any = CONSTANTS;

  constructor(
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private _toastr: ToastrService,
    private _sizeService: ClassService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getSize();
    this.sizeData.sort = this.sizeSort;
  }

  ngAfterViewInit() {
    this.sizeData.sort = this.sizeSort;
  }

  onKeySearch(event: any) { // without type info
    this.searchSize = event.target.value;
    this.getSize();
  }

  getSize(event: any = ''): void {
    this.isTableLoading = true;
    this.pageNo = event? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search: this.searchSize,
      pagination: true,
    };
    
    this._sizeService.getSize(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.totalSizeData = result.Data.totalDocs;
        this.SIZE_DATA = result.Data.docs;
        this.sizeData = new MatTableDataSource<SizeElement>(this.SIZE_DATA);
        this.sizeData.sort = this.sizeSort;
        this.isTableLoading = false;
      } else {
        this.isTableLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.isTableLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  editSize(e: any, resData: any) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(AddEditClassComponent, {
      width: '700px',
      data: [{ result: resData },
      { btnName: "Edit" }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getSize();
    });
  }


  addSize() {
    const dialogRef = this.dialog.open(AddEditClassComponent, {
      width: '410px',
      height: 'fit-content',
      data: [{ result: null },
      { btnName: "Add" }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getSize();
    });
  }

  changeStatusAction(e: any, resData: any) {
    //e.stopPropagation();
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to change the Status?",
        buttonNames: [{ firstBtn: "Update", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let param = {
          sizeid: resData.id
        }
        this._sizeService.changeStaus(param).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this._toastr.clear();
            this._toastr.success( result?.Message || "Status Updated successfully.", "Success");
            this.getSize();
            this.isTableLoading = false;
          } else {
            this.getSize();
            this.isTableLoading = false;
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this.getSize();
          this.isTableLoading = false;
          this._globalFunctions.errorHanding(error, this, true);
        });
      }else{
        this.getSize();
        this.isTableLoading = false;
      }
    });
  }


}
