import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClassService } from '../../class/class.service';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { CommonModalComponent } from '../../../common-modal/common-modal.component';
import { AddEditLeaveTypeComponent } from '../add-edit-leave-type/add-edit-leave-type.component';

export interface complaintComponent {
  id:any
  type: any;
  action: any;
  }

const STDATTENDANCE_DATA:complaintComponent[]=[
  { id:'1', type: 'Casual',action: ''},
  { id:'2', type: 'Casual',action: ''},
  { id:'3', type: 'Casual',action: ''},
];


@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrl: './leave-type.component.scss'
})
export class LeaveTypeComponent implements OnInit{
  searchSize: any = "";
  displayedColumns: string[] = ['id', 'type', 'action'];
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

  ngOnInit(): void {
    this.getAllCouponList();
  }
  
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

  addLeaveType(){
    const dialogRef = this._dialog.open(AddEditLeaveTypeComponent, {
      width: '410px',
      height: 'fit-content',
      data: [{ result: null },
      { btnName: "Add" }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getAllCouponList();
    });
  }

  editLeaveType(resData:any){
    // e.stopPropagation();
    const dialogRef = this._dialog.open(AddEditLeaveTypeComponent, {
      width: '410px',
      data: [{ result: resData },
      { btnName: "Edit" }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getAllCouponList();
    });
  }
  
  deleteLeaveType(resData:any){
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
    this._router.navigate(['leave/', resData?.id]);
  }
  
  }
