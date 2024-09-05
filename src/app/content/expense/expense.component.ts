import { Component } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClassService } from '../class/class.service';
import { GlobalFunctions } from '../../common/global-function';

export interface expenseComponent {
  no: any
  expense_title: any;
  paytment_method: any;
  date: any;
  category: any;
  amount: any;
  action: any;
}
const STDATTENDANCE_DATA: expenseComponent[] = [
  { no: '1', expense_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
  { no: '2', expense_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
  { no: '3', expense_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
  { no: '4', expense_title: 'Fees', paytment_method: 'Cash', date: '28 Jan, 2024', category: 'Fees Collection', amount: '10000', action: '' },
];
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  //  MEETING_DATA: meetingComponent[]=[] ;
  totalExpanse: any;
  searchSize: any = "";
  displayedColumns: string[] = ['no', 'expense_title', 'paytment_method', 'date', 'category', 'amount', 'action'];
  // noticeData = new MatTableDataSource<meetingComponent>(this.meetingData);
  expenseData = STDATTENDANCE_DATA;
  selection = new SelectionModel<expenseComponent>(true, []);
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
        this.totalExpanse = result?.Data?.totalDocs;
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
    this._router.navigate(['expense/', 'expensedetails']);
  }

  editExpense(event: any, resData: any) {
    event.stopPropagation();
    this._router.navigate(['expense/', resData?.id]);
  }

  deleteExpense(resData: any) {
    this.isTableLoading = true;
    const dialogRef = this._dialog.open(CommonModalComponent, {
      width: '410px',
      height: 'fit-content',
      data: {
        title: 'Confirmation!',
        message: 'Are You Sure You Want To Delete Expense Record ?',
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
