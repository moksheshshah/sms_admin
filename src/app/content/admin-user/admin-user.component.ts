import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { CONSTANTS } from '../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { GlobalFunctions } from '../../common/global-function';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../class/class.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../common-modal/common-modal.component';

export interface adminUsercomponent{
  no:any;
  admin_name:any;
  phone:any;
  email:any;
  role:any;
  login_username:any;
  password:any;
  status:any;
  action:any;
}

const STDATTENDANCE_DATA:adminUsercomponent[]=[
  { no:'1',admin_name: 'John Doe',phone: '9876543245',email: 'admin123@gmail.com',role: 'Principle',login_username:'Principle01',password:'*******',status:'',action:'' },
  { no:'2',admin_name: 'John Doe',phone: '9876543245',email: 'admin123@gmail.com',role: 'Principle',login_username:'Principle01',password:'*******',status:'',action:'' },
  { no:'3',admin_name: 'John Doe',phone: '9876543245',email: 'admin123@gmail.com',role: 'Principle',login_username:'Principle01',password:'*******',status:'',action:'' },
  { no:'4',admin_name: 'John Doe',phone: '9876543245',email: 'admin123@gmail.com',role: 'Principle',login_username:'Principle01',password:'*******',status:'',action:'' },
  { no:'5',admin_name: 'John Doe',phone: '9876543245',email: 'admin123@gmail.com',role: 'Principle',login_username:'Principle01',password:'*******',status:'',action:'' }
];
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent {
 // STUDENTS_REPORT_DATA:studentsReportComponent[]=[];
 totalCoupon:any;
 searchCoupon:any;
 displayedColumns:string[]=['no','admin_name','phone','email','role','login_username','password','status','action'];
 // students_reportData = new MatTableDataSource<studentsReportComponent>(this.STUDENTS_REPORTDATA);
 selection = new SelectionModel<adminUsercomponent>(true , []);
 adminData = STDATTENDANCE_DATA;
 // name:string = '';
 constants:any = CONSTANTS;
 selCouponStatus:any="";
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
 @ViewChild(MatSort,{static:false}) couponSort!:MatSort;
 @ViewChild('paginator', { static: true }) paginator!: Paginator
 selectedClass: any;
 selectedSection: any;

 constructor(
   private _globalFunctions:GlobalFunctions,
   private _toastr:ToastrService,
   private _couponService:ClassService,
   private _dialog:MatDialog,
   private _router: Router,
 ){}
 ngOnInit(){
   this.getAllCouponList();
 }


 onKeySearch(event:any){
   this.searchCoupon = event?.target?.value;
   this.getAllCouponList();
 }

 filterData(){
   $('.mat-mdc-select-panel.mdc-menu-surface.mdc-menu-surface--open').click(function(){
     $('.mat-focused').removeClass('mat-focused')
   })
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
       // this.STUDENTS_REPORT_DATA = result.Data.docs;
       // this.students_report_Data = new MatTableDataSource<studentsReportComponent>(this.STUDENTS_REPORT_DATA);
       // this.students_report_Data.sort = this.couponSort;
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
 addAdmin(){
    this._router.navigate(['admin-user/', 'adminuserdetail'])
 }

 editAdmin(event:any,resData:any){
   event.stopPropagation();
   this._router.navigate(['student/', resData?.id]);
 }


 changeStatusAction(event:any,resData:any){
   this.isTableLoading = true;
   const dialogRef = this._dialog.open(CommonModalComponent,{
     width:'600px',
     data:{
       title:'Confirmation',
       message:'Are you sure you want to change the status',
       buttonNames:[{firstBtn:"Update",secondBtn:'Cancel'}]
     }
   });
   dialogRef.afterClosed().subscribe((res)=>{
     if(res){
     //   let param = {
     //     couponid : resData?.id,
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

 imageOnError(event: any) {
   event.target.src = this.constants.defaultImage;
 }

 deleteAdmin(element:any){
   this.isTableLoading = true;
   const dialogRef = this._dialog.open(CommonModalComponent,{
     width:'410px',
     height:'fit-content',
     data:{
       title:'Confirmation!',
       message:'Are You Sure You Want To Delete Admin Record ?',
       buttonNames:[{firstBtn:"Cancel",secondBtn:'Yes, Delete'}]
     }
   });
   dialogRef.afterClosed().subscribe((res)=>{
     if(res){
       let param = {
         couponid : element?.id,
       }
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
}
