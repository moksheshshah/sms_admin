import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../class/class.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalFunctions } from '../../common/global-function';
import { Paginator } from 'primeng/paginator';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewPaymentHistoryComponent } from './view-payment-history/view-payment-history.component';
import { ViewFeeInvoiceComponent } from '../fee-invoices/view-fee-invoice/view-fee-invoice.component';


export interface paymentElement {
  studentName: string;
  class: string;
  section: string;
  admNo: string;
  invoiceNo: string;
  invoiceTitle: string;
  paid: string;
  paymentMethod: string;
  date: string;
  mobileNo: string;
  action:any
}
const PAYMENTHISTROY_DATA:paymentElement[]=[
  { studentName: 'John Doe',class: '1',section: 'A',admNo: '01',invoiceNo:'01',invoiceTitle:'sem - 1',paid:'3000',paymentMethod:'Debit card',date:'10 Aug, 2024',mobileNo:'9876543232',action:'' },
  { studentName: 'ABN Doe',class: '1',section: 'A',admNo: '02',invoiceNo:'02',invoiceTitle:'sem - 1',paid:'3000',paymentMethod:'Debit card',date:'10 Aug, 2024',mobileNo:'9876543232',action:'' },
];
@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent implements OnInit{
  PAYMENTHISTROY_DATA: paymentElement[] = [];
  totalSizeData: any;
  searchSize: any = "";
  displayedColumns: string[] = ['studentName', 'class', 'section', 'admNo', 'invoiceNo', 'invoiceTitle','paid','paymentMethod','date','mobileNo','action'];
  // sizeData = new MatTableDataSource<paymentElement>(this.PAYMENTHISTROY_DATA);
  paymentHistroyData = PAYMENTHISTROY_DATA;
  selection = new SelectionModel<paymentElement>(true, []);
  isTableLoading: boolean = false;
  classList:any = [
    { key:'1st', value:'1' }, 
    { key:'2nd', value:'2' }, 
    { key:'3rd', value:'3' }, 
    { key:'4th', value:'4' }, 
    { key:'5th', value:'5' }, 
  ];
  sectionList:any = [
    { key:'A', value:'A' }, 
    { key:'B', value:'B' }, 
    { key:'C', value:'C' }, 
    { key:'D', value:'D' }, 
    { key:'E', value:'E' }, 
  ];
  sectionstatus:any = [
    { key:'true', value:'true' }, 
    { key:'false', value:'alse' }, 
  ];
  selectedClass: any;
  selectdedSection: any;
  searchHistory: any;
  pageNo: any;
  limit: any;
  totalPayment: any;
  @ViewChild('paginator', { static: true }) paginator!: Paginator
  
  constructor(private _classService:ClassService, 
    private _globalFunctions:GlobalFunctions,
    private _dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.getPaymentHistory();
  }

  onKeySearch(event:any){
    this.searchHistory = event?.target?.value;
    this.getPaymentHistory();
  }

  getPaymentHistory(event:any = ''){
    this.isTableLoading = true;
    this.pageNo = event? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search:this.searchHistory || '',
    }

    this._classService.getSize(filter).subscribe((result:any)=>{
      if(result && result.IsSuccess){
        this.totalPayment = result?.Data?.totalDocs;
        this.PAYMENTHISTROY_DATA = result.Data.docs;
        // this.paymentHistroyData = new MatTableDataSource<paymentElement>(this.PAYMENTHISTROY_DATA);
        // this.paymentHistroyData.sort = this.couponSort;
        this.isTableLoading = false;
      } else {
        this.isTableLoading = false;
        this._globalFunctions.successErrorHandling(result,this,true)
      }
    },(error:any)=>{
      this.isTableLoading = false;
      this._globalFunctions.errorHanding(error,this,true);
    })
  }

  deleteHistory(element:any){
    this.isTableLoading = true;
    const dialogRef = this._dialog.open(CommonModalComponent,{
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
    }
      this.isTableLoading = false;
  });
  }

  viewHistory(element:any){
    const dialogRef = this._dialog.open(ViewFeeInvoiceComponent, {
      width: '100%',
      height: 'fit-content',
      data: [{ result: null }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getPaymentHistory();
    });
  }

}
