import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { ViewFeeInvoiceComponent } from './view-fee-invoice/view-fee-invoice.component';
import { ClassService } from '../class/class.service';
import { GlobalFunctions } from '../../common/global-function';

export interface SizeElement {
  studentName: string;
  class: string;
  section: string;
  admNo: string;
  invoiceNo: string;
  totalAmount: string;
  paid: string;
  due: string;
  issuedDate: string;
  paymentDate: string;
  mobileNo: string;
  status: string;
  action: string;
  // status:any;
  // action: any;
}
const STDATTENDANCE_DATA:SizeElement[]=[
  { studentName: 'John Doe',class: '1',section: 'A',admNo: '01',invoiceNo:'01',totalAmount:'5000',paid:'3000',due:'2000',issuedDate:'01 Aug, 2024',paymentDate:'10 Aug, 2024',mobileNo:'9876543232',status:'Paid',action:'' },
  { studentName: 'John Doe',class: '1',section: 'A',admNo: '01',invoiceNo:'01',totalAmount:'5000',paid:'3000',due:'2000',issuedDate:'01 Aug, 2024',paymentDate:'10 Aug, 2024',mobileNo:'9876543232',status:'Unpaid',action:'' },
  { studentName: 'John Doe',class: '1',section: 'A',admNo: '01',invoiceNo:'01',totalAmount:'5000',paid:'3000',due:'2000',issuedDate:'01 Aug, 2024',paymentDate:'10 Aug, 2024',mobileNo:'9876543232',status:'Partially Paid',action:'' },
];
@Component({
  selector: 'app-fee-invoices',
  templateUrl: './fee-invoices.component.html',
  styleUrl: './fee-invoices.component.scss'
})
export class FeeInvoicesComponent {
  // SIZE_DATA: SizeElement[] = [];
  searchSize: any = "";
  displayedColumns: string[] = ['studentName', 'class', 'section', 'admNo', 'invoiceNo', 'totalAmount','paid','due','issuedDate','paymentDate','mobileNo','status','action'];
  // sizeData = new MatTableDataSource<SizeElement>(this.SIZE_DATA);
  sizeData = STDATTENDANCE_DATA;
  selection = new SelectionModel<SizeElement>(true, []);
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
  statusList:any = [
    { key:'Select Status', value:'' }, 
    { key:'Paid', value:'paid' }, 
    { key:'Unpaid', value:'unpaid' }, 
    { key:'Partially Paid', value:'partiallypaid' }, 
  ];
  selectedClass: any;
  selectedSection: any;
  selectedStatus: any;
  pageNo: any;
  limit: any;
  couponSort: any;
  searchCoupon: string = '';
  totalInvoice: any;

  constructor(private _router:Router, 
    private _dialog:MatDialog,
    private _couponService:ClassService,
    private _globalFunctions:GlobalFunctions
  ){}

  ngOnInit(): void {
    this.getAllCouponList();
  }

  getAllCouponList(event:any = ''){
    this.isTableLoading = true;
    this.pageNo = event? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search:this.searchCoupon || '',
    }

    this._couponService.getSize(filter).subscribe((result:any)=>{
      if(result && result.IsSuccess){
        this.totalInvoice = result?.Data?.totalDocs;
        // this.COUPON_DATA = result.Data.docs;
        // this.couponData = new MatTableDataSource<homeworkComponent>(this.COUPON_DATA);
        // this.couponData.sort = this.couponSort;
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


  addFeesDetails(){
    this._router.navigate(['/fee-invoice', '/feesdetails']);
  }

  editFeesDetails(event:any, resData:any){
    event.stopPropagation();
    this._router.navigate(['/fee-invoice', resData?.id]);
  }

  deleteFeesDetails(resData:any){
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

  viewFeesDetails(element:any){
    const dialogRef = this._dialog.open(ViewFeeInvoiceComponent, {
      width: '900px',
      height: 'fit-content',
      data: [{ result: null }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {

    });
  }

  collectFees(){
    this._router.navigate(['/fee-invoice/collectfeepage/collectfeesdetails']);
  }

}
