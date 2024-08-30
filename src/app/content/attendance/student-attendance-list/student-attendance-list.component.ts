import { Component } from '@angular/core';
import { sutdentComponent } from '../../student/student.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CONSTANTS } from '../../../common/constants';
import { Router } from '@angular/router';


export interface studentAttendanceListComponent{
  student:any;
  rollno:any;
  date1:any;
  date2:any;
  date3:any;
  date4:any;
  date5:any;
  date6:any;
  date7:any;
  date8:any;
  date9:any;
  date10:any;
  date11:any;
  date12:any;
  date13:any;
  date14:any;
  date15:any;
  date16:any;
  date17:any;
  date18:any;
  date19:any;
  date20:any;
  date21:any;
  date22:any;
  date23:any;
  date24:any;
  date25:any;
  date26:any;
  date27:any;
  date28:any;
  date29:any;
  date30:any;
  date31:any;
  total_attendace:any;
  total_present:any;
  total_absent:any;
  total_leave:any;
}
const STDATTENDANCE_DATA:studentAttendanceListComponent[]=[
  { student: 'John Doe', rollno: '01', date1: 'P', date2: '-', date3: 'A', date4: 'P', date5: 'P', date6: '-', date7: '-', date8: '-', date9: '-', date10: '-', date11: '-', date12: 'L',date13: '-',date14: '-',date15: '-',date16: '-',date17: '-',date18: '-',date19: '-', date20: '-', date21: '-',date22: '-',date23: '-',date24: '-',date25: '-',date26: '-',date27: '-',date28: '-',date29: '-',date30: 'A',date31: 'A',total_attendace:'31',total_present:'24',total_absent:'06',total_leave:'01' },
  { student: 'John Doe', rollno: '01', date1: 'P', date2: '-', date3: 'A', date4: 'P', date5: 'P', date6: '-', date7: '-', date8: '-', date9: '-', date10: '-', date11: '-', date12: 'L',date13: '-',date14: '-',date15: '-',date16: '-',date17: '-',date18: '-',date19: '-', date20: '-', date21: '-',date22: '-',date23: '-',date24: '-',date25: '-',date26: '-',date27: '-',date28: '-',date29: '-',date30: 'A',date31: 'A',total_attendace:'31',total_present:'24',total_absent:'06',total_leave:'01' },
  { student: 'John Doe', rollno: '01', date1: 'P', date2: '-', date3: 'A', date4: 'P', date5: 'P', date6: '-', date7: '-', date8: '-', date9: '-', date10: '-', date11: '-', date12: 'L',date13: '-',date14: '-',date15: '-',date16: '-',date17: '-',date18: '-',date19: '-', date20: '-', date21: '-',date22: '-',date23: '-',date24: '-',date25: '-',date26: '-',date27: '-',date28: '-',date29: '-',date30: 'A',date31: 'A',total_attendace:'31',total_present:'24',total_absent:'06',total_leave:'01' },
  { student: 'John Doe', rollno: '01', date1: 'P', date2: '-', date3: 'A', date4: 'P', date5: 'P', date6: '-', date7: '-', date8: '-', date9: '-', date10: '-', date11: '-', date12: 'L',date13: '-',date14: '-',date15: '-',date16: '-',date17: '-',date18: '-',date19: '-', date20: '-', date21: '-',date22: '-',date23: '-',date24: '-',date25: '-',date26: '-',date27: '-',date28: '-',date29: '-',date30: 'A',date31: 'A',total_attendace:'31',total_present:'24',total_absent:'06',total_leave:'01' },
  { student: 'John Doe', rollno: '01', date1: 'P', date2: '-', date3: 'A', date4: 'P', date5: 'P', date6: '-', date7: '-', date8: '-', date9: '-', date10: '-', date11: '-', date12: 'L',date13: '-',date14: '-',date15: '-',date16: '-',date17: '-',date18: '-',date19: '-', date20: '-', date21: '-',date22: '-',date23: '-',date24: '-',date25: '-',date26: '-',date27: '-',date28: '-',date29: '-',date30: 'A',date31: 'A',total_attendace:'31',total_present:'24',total_absent:'06',total_leave:'01' },
  { student: 'John Doe', rollno: '01', date1: 'P', date2: '-', date3: 'A', date4: 'P', date5: 'P', date6: '-', date7: '-', date8: '-', date9: '-', date10: '-', date11: '-', date12: 'L',date13: '-',date14: '-',date15: '-',date16: '-',date17: '-',date18: '-',date19: '-', date20: '-', date21: '-',date22: '-',date23: '-',date24: '-',date25: '-',date26: '-',date27: '-',date28: '-',date29: '-',date30: 'A',date31: 'A',total_attendace:'31',total_present:'24',total_absent:'06',total_leave:'01' },

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
  displayedColumns:string[]=['student','date1','date2','date3','date4','date5','date6','date7','date8','date9','date10','date11','date12','date13','date14','date15','date16','date17','date18','date19','date20','date21','date22','date23','date24','date25','date26','date27','date28','date29','date30','date31','total_attendace','total_present','total_absent','total_leave'];
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
couponData: any;

constructor(private _router:Router){}

getAllCouponList() {

}

takeAttendance(event:any){
  event.stopPropagation();
  this._router.navigate(['/attendance/studenttakeattendance']);
}


}
