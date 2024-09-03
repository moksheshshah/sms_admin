import { Component } from '@angular/core';
import { CONSTANTS } from '../../../common/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { Action } from 'rxjs/internal/scheduler/Action';



export interface EditMarkComponent{
  studentName:any;
  rollNo:any;
  mobileNo:any;
  class:any;
  action:any;
}

const STDATTENDANCE_DATA:any[]=[
  { studentName: 'John Doe',rollNo:'121',mobileNo:'9537035855',class:'A',action:''},
  { studentName: 'John Doe',rollNo:'121',mobileNo:'9537035855',class:'A',action:''},
];

@Component({
  selector: 'app-edit-mark',
  templateUrl: './edit-mark.component.html',
  styleUrl: './edit-mark.component.scss'
})

export class EditMarkComponent{
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['studentName','rollNo','mobileNo','class','action'];
  studentTakeAttendanceData = STDATTENDANCE_DATA
  selection = new SelectionModel<EditMarkComponent>(true , []);
  name:string = '';
  constants:any = CONSTANTS;
  selCouponValidityStatus:any="Active";
  selCouponStatus:any="";
  startDate:any;
  endDate:any;
  pageNo:any;
  limit:any;
  isTableLoading:boolean = false; 
  selClass: any;
}
