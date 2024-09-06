import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTS } from '../../../common/constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewMarksheetComponent } from '../view-marksheet/view-marksheet.component';
import { ClassService } from '../../class/class.service';
import { GlobalFunctions } from '../../../common/global-function';

export interface printmarksheet {
  photo:any;
  admsNo:any;
  rollNo:any;
  studentName:any;
  class:any;
  fatherName:any;
  mobileNo:any;
  gender:any;
  address:any;
  action:any;
}

const MARKSHEET_DATA:printmarksheet[] = [
  { photo:'',admsNo:'01',rollNo:'01',studentName:'john doe',class:'1st - A',fatherName:'Umeshbhai s.',mobileNo:'6352417885',gender:'Male',address:'Pal RTO, Surat -345678',action:'' },
  { photo:'',admsNo:'01',rollNo:'01',studentName:'john doe',class:'1st - A',fatherName:'Umeshbhai s.',mobileNo:'6352417885',gender:'Male',address:'Pal RTO, Surat -345678',action:'' },
  { photo:'',admsNo:'01',rollNo:'01',studentName:'john doe',class:'1st - A',fatherName:'Umeshbhai s.',mobileNo:'6352417885',gender:'Male',address:'Pal RTO, Surat -345678',action:'' }
]
@Component({
  selector: 'app-print-marksheet',
  templateUrl: './print-marksheet.component.html',
  styleUrl: './print-marksheet.component.scss'
})
export class PrintMarksheetComponent implements OnInit{
  // COUPON_DATA:printmarksheet[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['photo','admsNo','rollNo','studentName','class','fatherName','mobileNo','gender','address','action'];
  // couponData = new MatTableDataSource<printmarksheet>(this.COUPON_DATA);
  couponData = MARKSHEET_DATA;
  selection = new SelectionModel<printmarksheet>(true , []);
  constants:any = CONSTANTS;
  selectedClass: any;
  selectedSection: any;
  selectedExam: any;
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
  examList:any = [
    { key:'Sem - 1', vlue:'sem - 1' }, 
    { key:'Sem - 2', vlue:'sem - 2' }, 
    { key:'Sem - 3', vlue:'sem - 3' }, 
    { key:'Sem - 4', vlue:'sem - 4' }, 
  ];
  isTableLoading: boolean = false;
  pageNo: any;
  limit: any;

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
        this.totalCoupon = result?.Data?.totalDocs;
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


  viewMarksheet(resData:any){
    const dialogRef = this._dialog.open(ViewMarksheetComponent, {
      width: '100%',
      height: 'fit-content',
      data: [{ result: null }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {

    });
  }

  imageOnError(event: any) {
    event.target.src = this.constants.defaultImage;
  }
}
