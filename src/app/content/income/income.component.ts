import { Component, OnInit } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassService } from '../class/class.service';
import { GlobalFunctions } from '../../common/global-function';

export interface incomeComponent {
  no: any
  income_title: any;
  paytment_method: any;
  date: any;
  category: any;
  amount: any;
  action: any;
}

const STDATTENDANCE_DATA: incomeComponent[] = [
  { no: '1', income_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
  { no: '2', income_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
  { no: '3', income_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
  { no: '4', income_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
];
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit{
onKeySearch($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
  //  MEETING_DATA: meetingComponent[]=[] ;
  totalIncome: any;
  searchSize: any = "";
  displayedColumns: string[] = ['no', 'income_title', 'paytment_method', 'date', 'category', 'amount', 'action'];
  // noticeData = new MatTableDataSource<meetingComponent>(this.meetingData);
  incomeData = STDATTENDANCE_DATA;
  selection = new SelectionModel<incomeComponent>(true, []);
  isTableLoading: boolean = false;
  classList: any = [
    { key: '1st', value: '1' },
    { key: '2nd', value: '2' },
    { key: '3rd', value: '3' },
    { key: '4th', value: '4' },
    { key: '5th', value: '5' },
  ];
  sectionList: any = [
    { key: 'A', value: 'A' },
    { key: 'B', value: 'B' },
    { key: 'C', value: 'C' },
    { key: 'D', value: 'D' },
    { key: 'E', value: 'E' },
  ];
  statusList: any = [
    { key: 'Select Status', value: '' },
    { key: 'Paid', value: 'paid' },
    { key: 'Unpaid', value: 'unpaid' },
    { key: 'Partially Paid', value: 'partiallypaid' },
  ];
  selectedClass: any;
  selectedSection: any;
  selectedStatus: any;
  limit: any;
  pageNo: any;
  searchCoupon: string = '';

  constructor(private _router: Router,
    private _dialog: MatDialog,
    private _couponService:ClassService,
    private _globalFunctions:GlobalFunctions
  ) { }

  ngOnInit(): void {
    this.getAllCouponList();
  }

  getAllCouponList(event: any = '') {
    // this.isTableLoading = true;
    this.pageNo = event ? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search: this.searchCoupon || '',
    }

    this._couponService.getSize(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.totalIncome = result?.Data?.totalDocs;
        // this.COUPON_DATA = result.Data.docs;
        // this.couponData = new MatTableDataSource<ExamsComponent>(this.COUPON_DATA);
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

  addIncome() {
    this._router.navigate(['income/', 'incomedetails']);
  }

  editIncome(event: any, resData: any) {
    event.stopPropagation();
    this._router.navigate(['income/', resData?.id]);
  }

  deleteIncome(resData: any) {
    this.isTableLoading = true;
    const dialogRef = this._dialog.open(CommonModalComponent, {
      width: '410px',
      height: 'fit-content',
      data: {
        title: 'Confirmation!',
        message: 'Are You Sure You Want To Delete Income Record ?',
        buttonNames: [{ firstBtn: "Cancel", secondBtn: 'Yes, Delete' }]
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
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
