import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTS } from '../../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { GlobalFunctions } from '../../../common/global-function';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../class/class.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../../common-modal/common-modal.component';

export interface sutdentTimetableComponent{
  day:any;
  lec_one:any;
  lec_two:any;
  lec_three:any;
  lec_four:any;
  breck:string;
  lec_five:any;
  lec_six:any;
  lec_seven:any;
  lec_eight:any;
  teachername:any;
  // action:any;
}

const STDTIMETABLE_DATA:sutdentTimetableComponent[]=[
  {day: 'Mon', lec_one:'English', teachername:"JohnDoe", lec_two:'Gujarati', lec_three:'Maths', lec_four:'Science', breck:'', lec_five:'English', lec_six:'Gujarati', lec_seven:'Maths', lec_eight:'Science'},
  {day: 'Tues', lec_one:'English', teachername:"JohnDoe", lec_two:'Gujarati', lec_three:'Maths', lec_four:'Science', breck:'', lec_five:'English', lec_six:'Gujarati', lec_seven:'Maths', lec_eight:'Science'},
  {day: 'Wed', lec_one:'English', teachername:"JohnDoe", lec_two:'Gujarati', lec_three:'Maths', lec_four:'Science', breck:'', lec_five:'English', lec_six:'Gujarati', lec_seven:'Maths', lec_eight:'Science'},
  {day: 'Thu', lec_one:'English', teachername:"JohnDoe", lec_two:'Gujarati', lec_three:'Maths', lec_four:'Science', breck:'', lec_five:'English', lec_six:'Gujarati', lec_seven:'Maths', lec_eight:'Science'},
  {day: 'Fri', lec_one:'English', teachername:"JohnDoe", lec_two:'Gujarati', lec_three:'Maths', lec_four:'Science', breck:'', lec_five:'English', lec_six:'Gujarati', lec_seven:'Maths', lec_eight:'Science'},
  {day: 'Sat', lec_one:'English', teachername:"JohnDoe", lec_two:'Gujarati', lec_three:'Maths', lec_four:'Science', breck:'', lec_five:'English', lec_six:'Gujarati', lec_seven:'Maths', lec_eight:'Science'},

];

@Component({
  selector: 'app-student-timetable-list',
  templateUrl: './student-timetable-list.component.html',
  styleUrl: './student-timetable-list.component.scss',
})
export class StudentTimetableListComponent {
  panelOpenState = false; 
  // STDTIMETABLE_DATA:sutdentTimetableComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['day','lec_one','lec_two','lec_three','lec_four','breck','lec_five','lec_six','lec_seven','lec_eight'];
  // stdTimetableData = new MatTableDataSource<sutdentTimetableComponent>(this.STDTIMETABLE_DATA);
  stdTimetableData = STDTIMETABLE_DATA; 
  selection = new SelectionModel<sutdentTimetableComponent>(true , []);
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
    this._router.navigate(['student/', resData?.id]);
  }

  addStudent(){
    this._router.navigate(['student/', "studentdetail"]);
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

  createTimetable(event:any){
    event.stopPropagation();
    this._router.navigate(['/timetable/studentcreatetimetable']);
  }
}
