import { Component, ViewChild } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CONSTANTS } from '../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../class/class.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../common/global-function';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  COUPON_DATA:ExamsComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['exam_title','class','exam_center','start_date','end_date','time_table','exam_result','status','action'];
  couponData = new MatTableDataSource<ExamsComponent>(this.COUPON_DATA);
  selection = new SelectionModel<ExamsComponent>(true , []);
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
  selectedClass: any;
  selectedSection: any;
  
  @ViewChild(MatSort,{static:false}) couponSort!:MatSort;
  @ViewChild('paginator', { static: true }) paginator!: Paginator

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

    this._couponService.getSize(filter).subscribe((result:any)=>{
      if(result && result.IsSuccess){
        this.totalCoupon = result?.Data?.totalDocs;
        this.COUPON_DATA = result.Data.docs;
        this.couponData = new MatTableDataSource<ExamsComponent>(this.COUPON_DATA);
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

  editExams(event:any,resData:any){
    event.stopPropagation();
    this._router.navigate(['exams/', resData?.id]);
  }

  addExams(){
    this._router.navigate(['exams/', "examsdetail"]);
  }
  
  changeStatusAction(e: any, resData: any) {
    //e.stopPropagation();
    this.isTableLoading = true;
    const dialogRef = this._dialog.open(CommonModalComponent, {
      width: '410px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to change the Status?",
        buttonNames: [{ firstBtn: "Update", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    //   if (res) {
    //     let param = {
    //       sizeid: resData.id
    //     }
    //     this._sizeService.changeStaus(param).subscribe((result: any) => {
    //       if (result && result.IsSuccess) {
    //         this._toastr.clear();
    //         this._toastr.success( result?.Message || "Status Updated successfully.", "Success");
    //         this.getSize();
    //         this.isTableLoading = false;
    //       } else {
    //         this.getSize();
    //         this.isTableLoading = false;
    //         this._globalFunctions.successErrorHandling(result, this, true);
    //       }
    //     }, (error: any) => {
    //       this.getSize();
    //       this.isTableLoading = false;
    //       this._globalFunctions.errorHanding(error, this, true);
    //     });
    //   }else{
    //     this.getSize();
    //     this.isTableLoading = false;
    //   }
    });
  }


  deleteExam(element:any){
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
    dialogRef.afterClosed().subscribe((res: any)=>{
      if(res){
        // let param = {
        //   couponid : element?.id,
        // }
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
