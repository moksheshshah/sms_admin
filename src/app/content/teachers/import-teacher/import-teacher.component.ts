import { Component, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CONSTANTS } from '../../../common/constants';
import { MatSort } from '@angular/material/sort';
import { Paginator } from 'primeng/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface teacherExcelComponent{
  teacher_name:any;
  class:any;
  section:any;
  ac_year:any;
  massage:any;
}
const STDEXCEL_DATA:teacherExcelComponent[]=[
  { teacher_name:'ABC', class:'1st', section:'A', ac_year:'2023 - 2024', massage:'Teacher Data Added Successfully.'},
  { teacher_name:'XYZ', class:'2st', section:'B', ac_year:'2023 - 2024', massage:'Please enter valid email.'},
];
@Component({
  selector: 'app-import-teacher',
  templateUrl: './import-teacher.component.html',
  styleUrl: './import-teacher.component.scss'
})
export class ImportTeachersComponent {

  massageData:any = [
    { key:'All', value:'all' },
    { key:'Success', value:'success' },
    { key:'Error', value:'error' },
  ];
  // STDEXCEL_DATA:studentExcelComponent[]=[];
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['teacher_name','class','section','ac_year','massage'];
  // studentExcelData = new MatTableDataSource<studentExcelComponent>(this.STDEXCEL_DATA);
  studentExcelData = STDEXCEL_DATA;
  selection = new SelectionModel<teacherExcelComponent>(true , []);
  name:string = '';
  constants:any = CONSTANTS;
  selCouponValidityStatus:any="Active";
  selCouponStatus:any="";
  startDate:any;
  endDate:any;
  pageNo:any;
  limit:any;
  isTableLoading:boolean = false; 
  massage:any

  selClass:any;
  @ViewChild(MatSort,{static:false}) couponSort!:MatSort;
  @ViewChild('paginator', { static: true }) paginator!: Paginator

  constructor(
    private _toastr:ToastrService,
    private _dialog:MatDialog,
    private _router: Router,
  ){}
  ngOnInit(){
    this.getAllCouponList();
  }

  ngAfterViewInit(){
    // this.studentExcelData.sort = this.couponSort;
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

    // this._couponService.getProductCouponList(filter).subscribe((result:any)=>{
    //   if(result && result.IsSuccess){
    //     this.totalCoupon = result?.Data?.totalDocs;
    //     this.STDEXCEL_DATA = result.Data.docs;
    //     this.studentExcelData = new MatTableDataSource<studentExcelComponent>(this.STDEXCEL_DATA);
    //     this.studentExcelData.sort = this.couponSort;
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
  importTeacher(event:any){
      
  }
  
  resetTeachers(){
  
  }
}







