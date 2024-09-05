import { Component, OnInit } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassService } from '../class/class.service';
import { MatTableDataSource } from '@angular/material/table';

export interface complaintComponent {
  complain_by:any;
  designation: any;
  mobile_no: any;
  complain_type: any;
  complain_date: any;
  status:any;
  action: any;
  }
  const STDATTENDANCE_DATA:complaintComponent[]=[
    { complain_by:'John Doe', designation: 'Teacher',mobile_no: '9876543234',complain_type: 'Fees issues',complain_date:'17 Jul, 2024',status:'Pending', action: ''},
    { complain_by:'John Doe', designation: 'Teacher',mobile_no: '9876543234',complain_type: 'Fees issues',complain_date:'24 Jul, 2024',status:'Resolved',action: ''},
    { complain_by:'John Doe', designation: 'Teacher',mobile_no: '9876543234',complain_type: 'Fees issues',complain_date:'17 Jul, 2024',status:'Pending',action: ''},
    { complain_by:'John Doe', designation: 'Teacher',mobile_no: '9876543234',complain_type: 'Fees issues',complain_date:'24 Jul, 2024',status:'Resolved',action: ''}
  ];
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.scss'
})
export class ComplaintComponent implements OnInit{
  //  COMPLAIN_DATA: complaintComponent[]=[] ;
  searchSize: any = "";
  displayedColumns: string[] = ['complain_by', 'designation', 'mobile_no', 'complain_type','complain_date','status', 'action'];
  // noticeData = new MatTableDataSource<meetingComponent>(this.meetingData);
  complainData = STDATTENDANCE_DATA;
  selection = new SelectionModel<complaintComponent>(true, []);
  isTableLoading: boolean = false;
  statusList:any = [
    { key:'Select Status', value:'' }, 
    { key:'Pending', value:'pending' }, 
    { key:'Resolved', value:'Resolved' }, 
  ];
  selectedStatus: any;
  pageNo: any;
  limit: any;
  couponData: any;
  totalCoupon: any;
  STDATTENDANCE_DATA: any;
  couponSort: any;
  private _globalFunctions: any;

constructor(private _router:Router, 
  private _dialog:MatDialog,
  private _couponService:ClassService
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
    search:this.searchSize || '',
  }

  this._couponService.getSize(filter).subscribe((result:any)=>{
    if(result && result.IsSuccess){
      this.totalCoupon = result?.Data?.totalDocs;
      this.STDATTENDANCE_DATA = result.Data.docs;
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

editComplaint(event:any, resData:any){
  event.stopPropagation();
  this._router.navigate(['complaint/', 'complaintdetails']);
}

deleteComplaint(resData:any){
  this.isTableLoading = true;
  const dialogRef = this._dialog.open(CommonModalComponent,{
    width:'410px',
    height:'fit-content',
    data:{
      title:'Confirmation!',
      message:'Are You Sure You Want To Delete Complain Record ?',
      buttonNames:[{firstBtn:"Cancel",secondBtn:'Yes, Delete'}]
    }
  });
  dialogRef.afterClosed().subscribe((res: any)=>{
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
    // this.isTableLoading = false;
  }
  });
}

}
