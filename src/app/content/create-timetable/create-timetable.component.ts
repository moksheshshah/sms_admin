import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { CONSTANTS } from '../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../class/class.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { ViewExamTimetableComponent } from './view-exam-timetable/view-exam-timetable.component';

export interface CreateTimetableComponent{
  date:any;
  time:any;
  maximum_marks:any;
  room_no:any;
  subject_code:any;
  subject:any;
  // action:any;
}

const STDTIMETABLE_DATA:any[]=[
  {date: '08 Aug, 2024',time: '09:00 PM - 12:00 PM', maximum_marks: '100', room_no: '05', subject_code: '01', subject: 'English'}
];
@Component({
  selector: 'app-create-timetable',
  templateUrl: './create-timetable.component.html',
  styleUrl: './create-timetable.component.scss'
})
export class CreateTimetableComponent {
  panelOpenState = false; 
  // STDTIMETABLE_DATA:sutdentTimetableComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['date','time','maximum_marks','room_no','subject_code','subject'];
  // stdTimetableData = new MatTableDataSource<sutdentTimetableComponent>(this.STDTIMETABLE_DATA);
  stdTimetableData = STDTIMETABLE_DATA; 
  selection = new SelectionModel<CreateTimetableComponent>(true , []);
  name:string = '';
  constants:any = CONSTANTS;
  selCouponValidityStatus:any="Active";
  selCouponStatus:any="";
  startDate:any;
  endDate:any;
  pageNo:any;
  limit:any;
  isTableLoading:boolean = false; 
  selClass:any;
  @ViewChild(MatSort,{static:false}) couponSort!:MatSort;
  @ViewChild('paginator', { static: true }) paginator!: Paginator
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

  constructor(
    private _toastr:ToastrService,
    private _couponService:ClassService,
    private _dialog:MatDialog,
    private _router: Router,
  ){}
  ngOnInit(){
    this.getAllCouponList();
  }

  ngAfterViewInit(){
    // this.stdTimetableData.sort = this.couponSort;
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
    // this.isTableLoading = true;
    // this.pageNo = event? (event.page + 1) : 1;
    // this.limit = event.rows || 10;
    // let filter = {
    //   page: this.pageNo || '1',
    //   limit: this.limit || '10',
    //   search:this.searchCoupon || '',
    // }

    // this._couponService.getSize(filter).subscribe((result:any)=>{
    //   if(result && result.IsSuccess){
    //     this.totalCoupon = result?.Data?.totalDocs;
    //     this.STDTIMETABLE_DATA = result.Data.docs;
    //     this.stdTimetableData = new MatTableDataSource<sutdentTimetableComponent>(this.STDTIMETABLE_DATA);
    //     this.stdTimetableData.sort = this.couponSort;
    //     this.isTableLoading = false;
    //   } else {
    //     this.isTableLoading = false;
    //     this._globalFunctions.successErrorHandling(result,this,true)
    //   }
    // },(error:any)=>{
    //   this.isTableLoading = false;
    //   this._globalFunctions.errorHanding(error,this,true);
    // })
  }

  editStudent(event:any,resData:any){
    event.stopPropagation();
    this._router.navigate(['create-timetable/', resData?.id]);
  }

  createExamTimetable(){
    this._router.navigate(['create-timetable/', "createtimetabledetail"]);
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

  viewExamTimetable(){
    const dialogRef = this._dialog.open(ViewExamTimetableComponent, {
      width: '100%',
      height: 'fit-content',
      data: [{ result: null }
      ],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getAllCouponList();
    });
  }

}
