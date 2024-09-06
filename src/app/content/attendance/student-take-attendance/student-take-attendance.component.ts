import { NumberInput } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CONSTANTS } from '../../../common/constants';
import { Router } from '@angular/router';
import { ClassService } from '../../class/class.service';
import { GlobalFunctions } from '../../../common/global-function';
export interface studentTakeAttendanceComponent{
  roll_no:any;
  student_name:any;
  class:any;
  section:any;
  status:any;
  mark_all_present:any;
  mark_all_absent:any;
 
}
const STDATTENDANCE_DATA:studentTakeAttendanceComponent[]=[
  { roll_no: '1',student_name:'John Doe',class:'1',section:'A',status:'Undefined',mark_all_present:'Present',mark_all_absent:'Absent'},
  { roll_no: '2',student_name:'John Doe',class:'1',section:'A',status:'Undefined',mark_all_present:'Present',mark_all_absent:'Absent'},

 
];
@Component({
  selector: 'app-student-take-attendance',
  templateUrl: './student-take-attendance.component.html',
  styleUrl: './student-take-attendance.component.scss'
})
export class StudentTakeAttendanceComponent implements OnInit{
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['roll_no','student_name','class','section','status','mark_all_absent','mark_all_present'];
  // studentAttendanceData = new MatTableDataSource<studentTakeAttendanceComponent>(this.STDATTENDANCE_DATA);
  studentTakeAttendanceData = STDATTENDANCE_DATA
  selection = new SelectionModel<studentTakeAttendanceComponent>(true , []);
  name:string = '';
  constants:any = CONSTANTS;
  selCouponValidityStatus:any="Active";
  selCouponStatus:any="";
  startDate:any;
  endDate:any;
  pageNo:any;
  limit:any;
  isTableLoading:boolean = false;
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
selClass: any;
couponData: any;

constructor(private _router:Router,
  private _couponService:ClassService,
  private _globalFunctions:GlobalFunctions
){}


ngOnInit(): void {
  this.getAllCouponList();
}

getAllCouponList(event:any = "") {
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


}
