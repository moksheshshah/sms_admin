import { Component, ViewChild } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ClassService } from '../class/class.service';
import { GlobalFunctions } from '../../common/global-function';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

export interface visitorComponent {
  purpose: any
  meetingWith: any;
  visitorName: any;
  mobileNo: any;
  noPerson: any;
  date: any;
  inTime: any;
  outTime: any;
  action: any;
}

const VISITOR_DATA: visitorComponent[] = [
  { purpose:'Student Meeting',meetingWith:'Student (John Doe - 01)',visitorName:'Williams Doe',mobileNo:'9876543234',noPerson:'2',date:'26 Jan, 2024',inTime:'10:00 AM',outTime:'12:00 AM',action:'' },
  { purpose:'Student Meeting',meetingWith:'Student (John Doe - 01)',visitorName:'Williams Doe',mobileNo:'9876543234',noPerson:'2',date:'26 Jan, 2024',inTime:'10:00 AM',outTime:'12:00 AM',action:'' },
  { purpose:'Student Meeting',meetingWith:'Student (John Doe - 01)',visitorName:'Williams Doe',mobileNo:'9876543234',noPerson:'2',date:'26 Jan, 2024',inTime:'10:00 AM',outTime:'12:00 AM',action:'' },
 
];

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.scss'
})
export class VisitorComponent {

  // VISITOR_DATA: visitorComponent[] = [];
  searchSize: any = "";
  displayedColumns: string[] = ['purpose', 'meetingWith', 'visitorName', 'mobileNo', 'noPerson', 'date','inTime','outTime', 'action'];
  // noticeData = new MatTableDataSource<visitorComponent>(this.VISITOR_DATA);
  visitorData = VISITOR_DATA;
  selection = new SelectionModel<visitorComponent>(true, []);
  isTableLoading: boolean = false;
  pageNo: any;
  limit: any;
  totalVisitor: any;
  @ViewChild(MatSort, { static: false }) sizeSort!: MatSort;

  constructor(private _router: Router,
    private _couponService: ClassService,
    private _globalFunctions: GlobalFunctions,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCouponList();
  }

  getAllCouponList(event: any = '') {
    this.isTableLoading = true;
    this.pageNo = event ? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search: this.searchSize || '',
    }

    this._couponService.getSize(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.totalVisitor = result?.Data?.totalDocs;
        // this.VISITOR_DATA = result.Data.docs;
        // this.couponData = new MatTableDataSource<visitorComponent>(this.VISITOR_DATA);
        // this.couponData.sort = this.couponSort;
        this.isTableLoading = false;
      } else {
        this.isTableLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isTableLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    })
  }

  editVisitor(resData:any){
    // this._router.navigate(['visitor/', resData?.id]);
    this._router.navigate(['visitor/', 'visitordetails']);
  }

  deleteVisitor(resData: any) {
    // this.isTableLoading = true;
    const dialogRef = this._dialog.open(CommonModalComponent, {
      width: '410px',
      height: 'fit-content',
      data: {
        title: 'Confirmation!',
        message: 'Are you sure you want to delete the School? Please note that all data related to this School will be deleted.',
        buttonNames: [{ firstBtn: "Cancle", secondBtn: 'Yes, Delete' }]
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //   let param = {
        //     couponid : element?.id,
        //   }
        //   this._couponService.changeCouponStatus(param).subscribe((result:any)=>{
        //     if(result && result.IsSuccess){
        //       this._toastr.clear();
        //       this._toastr.success(result?.Message || "Status updated successfully." , "Success");
        //       this.getAllCouponList();
        //       this.isTableLoading = false;
        //     } else {
        //       this.getAllCouponList();
        //       this.isTableLoading = false;
        //       this._globalFunctions.successErrorHandling(result,this,true);
        //     }
        //   },(error:any)=>{
        //     this.getAllCouponList();
        //     this.isTableLoading = false;
        //     this._globalFunctions.errorHanding(error,this,true)
        //   })
        // } else {
        //   this.getAllCouponList();
        //   this.isTableLoading = false;
      }
    });
  }

}
