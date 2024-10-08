import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTS } from '../../common/constants';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../common/global-function';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddEditClassComponent } from '../class/add-edit-class/add-edit-class.component';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { ClassService } from '../class/class.service';
import { AddEditAcademicYearComponent } from './add-edit-academic-year/add-edit-academic-year.component';

export interface SizeElement {
  year: string;
  startDate: string;
  endDate: string;
  status:any;
  action: any;
}

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrl: './academic-year.component.scss'
})
export class AcademicYearComponent {
  isTableLoading: boolean = false;
  SIZE_DATA: SizeElement[] = [];
  totalSizeData: any;
  searchSize: any = "";
  displayedColumns: string[] = ['year', 'startDate', 'endDate', 'status', 'action'];
  sizeData = new MatTableDataSource<SizeElement>(this.SIZE_DATA);
  selection = new SelectionModel<SizeElement>(true, []);
  name: string = "";
  constants: any = CONSTANTS;
  pageNo: any;
  limit: any;
  @ViewChild(MatSort, { static: false }) sizeSort!: MatSort;

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
    const dialogRef = this.dialog.open(AddEditAcademicYearComponent, {
      width: '500px',
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
    const dialogRef = this.dialog.open(AddEditAcademicYearComponent, {
      width: '500px',
      height: 'fit-content',
      data: [{ result: null },
      { btnName: "Add New" }
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
      width: '410px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to change the Status?",
        buttonNames: [{ firstBtn: "Update", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    //   if (res) {
    //     let param = {
    //       sizeid: resData.id
    //     }
    //     this._sizeService.changeStaus(param).subscribe((result: any) => {
    //       if (result && result.IsSuccess) {
    //         this._toastr.clear();
    //         this._toastr.success( result?.Message || "Status Updated successfully.", "Success");
    //         this.getSize();
    //         this.isTableLoading = false;
    //       } else {
    //         this.getSize();
    //         this.isTableLoading = false;
    //         this._globalFunctions.successErrorHandling(result, this, true);
    //       }
    //     }, (error: any) => {
    //       this.getSize();
    //       this.isTableLoading = false;
    //       this._globalFunctions.errorHanding(error, this, true);
    //     });
    //   }else{
    //     this.getSize();
    //     this.isTableLoading = false;
    //   }
    });
  }

  deleteClass(element:any){
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent,{
      width:'410px',
      height:'fit-content',
      data:{
        title:'Confirmation!',
        message:'Are you sure you want to delete the School? Please note that all data related to this School will be deleted.',
        buttonNames:[{firstBtn:"Cancle",secondBtn:'Yes, Delete'}]
      }
    });
    dialogRef.afterClosed().subscribe((res)=>{
      if(res){
      //   let param = {
      //     couponid : element?.id,
      //   }
      //   this._sizeService.changeStaus(param).subscribe((result:any)=>{
      //     if(result && result.IsSuccess){
      //       this._toastr.clear();
      //       this._toastr.success(result?.Message || "Status updated successfully." , "Success");
      //       this.getSize();
      //       this.isTableLoading = false;
      //     } else {
      //       this.getSize();
      //       this.isTableLoading = false;
      //       this._globalFunctions.successErrorHandling(result,this,true);
      //     }
      //   },(error:any)=>{
      //     this.getSize();
      //     this.isTableLoading = false;
      //     this._globalFunctions.errorHanding(error,this,true)
      //   })
      // } else {
      //   this.getSize();
    }
    this.isTableLoading = false;
    });
  }
}
