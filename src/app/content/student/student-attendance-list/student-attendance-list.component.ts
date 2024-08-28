import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTS } from '../../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { GlobalFunctions } from '../../../common/global-function';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../class/class.service';
import { Router } from '@angular/router';

export interface attendanceComponent{
  date:any;
  day:any;
  present:any;
  absent:any;
  pending:any;
  leave:any;
}

const ATTENDANCE_DATA:attendanceComponent[]=[
  { date:'01-07-2024', day:'Monday', present:'Present', absent:'', pending:'', leave:'' },
  { date:'02-07-2024', day:'Tuesday', present:'', absent:'Absent', pending:'', leave:'' },
  { date:'03-07-2024', day:'Wednesday', present:'', absent:'', pending:'Pending', leave:'' },
  { date:'04-07-2024', day:'Thursday', present:'', absent:'', pending:'', leave:'Leave' },
];


@Component({
  selector: 'app-student-attendance-list',
  templateUrl: './student-attendance-list.component.html',
  styleUrl: './student-attendance-list.component.scss'
})
export class StudentAttendanceListComponent {
  // ATTENDANCE_DATA:attendanceComponent[]=[];
  totalattandance:any;
  displayedColumns:string[]=['date','day','present','absent','pending','leave'];
  // attendanceData = new MatTableDataSource<attendanceComponent>(this.ATTENDANCE_DATA);
  attendanceData = ATTENDANCE_DATA;
  selection = new SelectionModel<attendanceComponent>(true , []);
  name:string = '';
  constants:any = CONSTANTS;
  startDate:any;
  endDate:any;
  pageNo:any;
  limit:any;
  isTableLoading:boolean = false; 
  Class:any;
  @ViewChild(MatSort,{static:false}) couponSort!:MatSort;
  @ViewChild('paginator', { static: true }) paginator!: Paginator

  constructor(
    private _globalFunctions:GlobalFunctions,
    private _toastr:ToastrService,
    private _router: Router,
  ){}
  ngOnInit(){
    this.getAttendanceList();
  }

  ngAfterViewInit(){
    // this.attendanceData.sort = this.couponSort;
  }

  filterData(){
    $('.mat-mdc-select-panel.mdc-menu-surface.mdc-menu-surface--open').click(function(){
      $('.mat-focused').removeClass('mat-focused')
    })
    this.getAttendanceList();  
  }

  getAttendanceList(event:any = ''){
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
    //     this.totalattandance = result?.Data?.totalDocs;
    //     this.ATTENDANCE_DATA = result.Data.docs;
    //     this.attendanceData = new MatTableDataSource<attendanceComponent>(this.ATTENDANCE_DATA);
    //     this.attendanceData.sort = this.couponSort;
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

}
