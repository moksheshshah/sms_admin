import { SelectionModel } from '@angular/cdk/collections';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { CONSTANTS } from '../../common/constants';
import { MatSort } from '@angular/material/sort';
import { GlobalFunctions } from '../../common/global-function';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { SchoolsService } from '../schools/schools.service';


export interface CouponComponent{
  photo:any;
  adms_no:any;
  roll_no:any;
  student_name:any;
  class:any;
  father_name:any;
  phone:string;
  gender:any;
  address:any;
  status:any;
  action:any;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  COUPON_DATA:CouponComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['photo','adms_no','roll_no','student_name','class','father_name','phone','gender','address','status','action'];
  couponData = new MatTableDataSource<CouponComponent>(this.COUPON_DATA);
  selection = new SelectionModel<CouponComponent>(true , []);
  name:string = '';
  constants:any = CONSTANTS;
  selCouponValidityStatus:any="Active";
  selCouponStatus:any="";
  startDate:any;
  endDate:any;
  pageNo:any;
  limit:any;
  isTableLoading:boolean = false; 
  @ViewChild(MatSort,{static:false}) couponSort!:MatSort;
  @ViewChild('paginator', { static: true }) paginator!: Paginator

  constructor(
    private _globalFunctions:GlobalFunctions,
    private _toastr:ToastrService,
    private _couponService:SchoolsService,
    private _dialog:MatDialog,
    private _router: Router,
  ){}
  ngOnInit(){
    this.getAllCouponList();
  }

  ngAfterViewInit(){
    this.couponData.sort = this.couponSort;
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

    this._couponService.getProductCouponList(filter).subscribe((result:any)=>{
      if(result && result.IsSuccess){
        this.totalCoupon = result?.Data?.totalDocs;
        this.COUPON_DATA = result.Data.docs;
        this.couponData = new MatTableDataSource<CouponComponent>(this.COUPON_DATA);
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

  editStudent(event:any,resData:any){
    event.stopPropagation();
    this._router.navigate(['student/', resData?.id]);
  }

  addStudent(){
    this._router.navigate(['student/', "studentdetail"]);
  }
  
  importStudent(event:any){
    event.stopPropagation();
    this._router.navigate(['/student/studentdata/importStudents']);
  }

  changeStatusAction(event:any,resData:any){
    this.isTableLoading = true;
    const dialogRef = this._dialog.open(CommonModalComponent,{
      width:'600px',
      data:{
        title:'Confirmation',
        message:'Are you sure you want to change the status',
        buttonNames:[{firstBtn:"Update",secondBtn:'Cancle'}]
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

  deleteSchool(element:any){
    this.isTableLoading = true;
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
