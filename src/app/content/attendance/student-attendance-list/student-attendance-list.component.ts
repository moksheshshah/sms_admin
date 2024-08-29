import { Component } from '@angular/core';
import { sutdentComponent } from '../../student/student.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CONSTANTS } from '../../../common/constants';


export interface studentAttendanceListComponent{
  student:any;
  rollno:any;
  date1:any;
  date2:any;
}
const STDATTENDANCE_DATA:studentAttendanceListComponent[]=[
  { student:'Abc',rollno:'01', date1:'P',date2:'-' },

];
@Component({
  selector: 'app-student-attendance-list',
  templateUrl: './student-attendance-list.component.html',
  styleUrl: './student-attendance-list.component.scss'
})
export class StudentAttendanceListComponent {
  // STDATTENDANCE_DATA:studentAttendanceListComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['student','date1','date2'];
  // studentAttendanceData = new MatTableDataSource<studentAttendanceListComponent>(this.STDATTENDANCE_DATA);
  studentAttendanceData = STDATTENDANCE_DATA
  selection = new SelectionModel<studentAttendanceListComponent>(true , []);
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

getAllCouponList() {

}


}
