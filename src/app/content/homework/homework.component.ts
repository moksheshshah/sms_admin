import { SelectionModel } from '@angular/cdk/collections';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTS } from '../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { ToastrService } from 'ngx-toastr';
import { GlobalFunctions } from '../../common/global-function';
import { ClassService } from '../class/class.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
export interface homeworkComponent{

  class:any;
  section:any;
  subject_Name:any;
  creation_date:any;
  submission_date:any;
  created_by:string;
  action:any;
}
@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrl: './homework.component.scss'
})
export class HomeworkComponent {
  COUPON_DATA:homeworkComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['#','class','section','subject_Name','creation_date','submission_date','created_by','action'];
  couponData = new MatTableDataSource<homeworkComponent>(this.COUPON_DATA);
  selection = new SelectionModel<homeworkComponent>(true , []);
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
  subjectList:any = [
    { key:'Enaglish', value:'english' }, 
    { key:'Hindi', value:'hindi' }, 
    { key:'Gujrati', value:'gujrati' }, 
    { key:'Science', value:'science' }, 
  ];
  sectionList:any = [
    { key:'A', value:'A' }, 
    { key:'B', value:'B' }, 
    { key:'C', value:'C' }, 
    { key:'D', value:'D' }, 
    { key:'E', value:'E' }, 
  ];
  genderList:any = [
    { key:'Male', value:'male' },
    { key:'Female', value:'female' },
    { key:'Other', value:'other' },
  ];
  sortBy:any = [
    { key:'A To Z', value:'A To Z' },
    { key:'1 To 10', value:'1 To 10' },
    { key:'a To z', value:'a To z' },
  ];
  religionList:any = [
    { key:'Hindu', value:'hindu' },
    { key:'Christian', value:'christian' },
    { key:'Jain', value:'jain' },
    { key:'Sikh', value:'sikh' },
    { key:'Buddhist ', value:'buddhist ' },
    { key:'Muslim', value:'muslim' },
  ];
  selClass:any;
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
        this.couponData = new MatTableDataSource<homeworkComponent>(this.COUPON_DATA);
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
    this._router.navigate(['homework/', resData?.id]);
  }

  addHomework(){
    this._router.navigate(['homework/', "homeworkdetail"]);
  }

  deleteHomework(element:any){
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
