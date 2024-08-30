import { NumberInput } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CONSTANTS } from '../../../common/constants';
import { Router } from '@angular/router';
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
export class StudentTakeAttendanceComponent {
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

constructor(private _router:Router){}

getAllCouponList() {

}


}
