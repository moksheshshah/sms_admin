import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  sectionstatus:any = [
    { key:'true', value:'true' }, 
    { key:'false', value:'alse' }, 
  ];
selClass: any;

  constructor(private _router:Router){}

addFeesDetails(){
  this._router.navigate(['/fee-invoice', '/feesdetails']);
}
collectFees(){
  this._router.navigate(['/fee-invoice/collectfeepage/collectfeesdetails']);
}
}
