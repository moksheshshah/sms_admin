import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../common/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ClassService } from '../../class/class.service';
import { GlobalFunctions } from '../../../common/global-function';
import { MatDialog } from '@angular/material/dialog';
import { ViewFeeInvoiceComponent } from '../../fee-invoices/view-fee-invoice/view-fee-invoice.component';
import { AddMarksComponent } from '../add-marks/add-marks.component';
import { data } from 'jquery';



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

export class EditMarkComponent implements OnInit{
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
  resMarkData: any;

  constructor(private _classService:ClassService, 
    private _globalFunctions:GlobalFunctions,
    private _dialog:MatDialog){}

  ngOnInit(): void {
    
  }

  addNewMarks(){
    const dialogRef = this._dialog.open(AddMarksComponent, {
      width: '100%',
      height: 'fit-content',
      data: [{ result: null }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log("res-->>",res);
      this.resMarkData = res;
      
      // this.getPaymentHistory();
    });
  }

  editNewMarks(event:any, resData:any){
    // event.stopPropagation();
  }

  submitMarks(){
    console.log("data....",this.resMarkData);
    
  }

  imageOnError(event: any) {
    event.target.src = this.constants.defaultImage;
  }
}
