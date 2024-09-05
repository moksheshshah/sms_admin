import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../common/constants';
import { studentAttendanceListComponent } from '../../attendance/student-attendance-list/student-attendance-list.component';
import { ClassService } from '../../class/class.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalFunctions } from '../../../common/global-function';
import { CommonModalComponent } from '../../../common-modal/common-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewLeaveDetailsComponent } from '../view-leave-details/view-leave-details.component';

export interface complaintComponent {
  id:any
  name: any;
  type: any;
  date: any;
  reason: any;
  apply_date:any;
  status:any;
  action: any;
  }

const STDATTENDANCE_DATA:complaintComponent[]=[
  { id:'1', name: 'John Doe',type: 'Casual',date: '28 Jan, 2024 - 30 Jan, 2024 ',reason:'Lorem Ipsum dummy text best',apply_date:'26 Jan, 2024',status:'Pending', action: ''},
  { id:'2', name: 'John Doe',type: 'Casual',date: '28 Jan, 2024 - 30 Jan, 2024 ',reason:'Lorem Ipsum dummy text best',apply_date:'26 Jan, 2024',status:'Approved',action: ''},
  { id:'3', name: 'John Doe',type: 'Casual',date: '28 Jan, 2024 - 30 Jan, 2024 ',reason:'Lorem Ipsum dummy text best',apply_date:'26 Jan, 2024',status:'Pending',action: ''},
];

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.scss'
})
export class LeaveRequestsComponent {
//  COMPLAIN_DATA: complaintComponent[]=[] ;
searchSize: any = "";
displayedColumns: string[] = ['id', 'name', 'type', 'date','reason','apply_date','status', 'action'];
// noticeData = new MatTableDataSource<meetingComponent>(this.meetingData);
complainData = STDATTENDANCE_DATA;
selection = new SelectionModel<complaintComponent>(true, []);
isTableLoading: boolean = false;
pageNo: any;
limit: any;
couponData: any;
totalCoupon: any;
couponSort: any;
selectedStatus: any;
selectedStaff: any;
statusList:any = [
  { key:'Select Status', value:'' }, 
  { key:'Pending', value:'pending' }, 
  { key:'Approved', value:'approved' }, 
];
classList:any = [
  { key:'1st', value:'1' }, 
  { key:'2nd', value:'2' }, 
  { key:'3rd', value:'3' }, 
  { key:'4th', value:'4' }, 
  { key:'5th', value:'5' }, 
];

constructor(private _router:Router, 
  private _couponService:ClassService,
  private _globalFunctions:GlobalFunctions,
  private _dialog:MatDialog
){}

getAllCouponList(event:any = '') {
  this.isTableLoading = true;
  this.pageNo = event? (event.page + 1) : 1;
  this.limit = event.rows || 10;
  let filter = {
    page: this.pageNo || '1',
    limit: this.limit || '10',
    search:this.searchSize || '',
  }

  this._couponService.getSize(filter).subscribe((result:any)=>{
    if(result && result.IsSuccess){
      this.totalCoupon = result?.Data?.totalDocs;
      // this.STDATTENDANCE_DATA = result.Data.docs;
      this.couponData = new MatTableDataSource<complaintComponent>(this.couponData);
      this.couponData.sort = this.couponSort;
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

deleteLeave(resData:any){
  // this.isTableLoading = true;
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
      //   this._couponService.changeCouponStatus(param).subscribe((result:any)=>{
      //     if(result && result.IsSuccess){
      //       this._toastr.clear();
      //       this._toastr.success(result?.Message || "Status updated successfully." , "Success");
      //       this.getAllCouponList();
      //       this.isTableLoading = false;
      //     } else {
      //       this.getAllCouponList();
      //       this.isTableLoading = false;
      //       this._globalFunctions.successErrorHandling(result,this,true);
      //     }
      //   },(error:any)=>{
      //     this.getAllCouponList();
      //     this.isTableLoading = false;
      //     this._globalFunctions.errorHanding(error,this,true)
      //   })
      // } else {
      //   this.getAllCouponList();
      //   this.isTableLoading = false;
      }
    });
  }

viewLeave(resData:any){
  this._router.navigate(['leave/', resData?.id])
}

}


