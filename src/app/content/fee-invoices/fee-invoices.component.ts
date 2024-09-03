import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { ViewFeeInvoiceComponent } from './view-fee-invoice/view-fee-invoice.component';
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
  SIZE_DATA: SizeElement[] = [];
  totalSizeData: any;
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

  constructor(private _router:Router, 
    private _dialog:MatDialog
  ){}

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
