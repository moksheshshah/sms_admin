import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassService } from '../class/class.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalFunctions } from '../../common/global-function';

export interface eventComponent {
  event_title: string;
  event_date: any;
  exam_des: any;
  publish: any;
  action: any;
}

const EVENT_DATA: eventComponent[]=[
  { event_title:'15 Aug Celebration', event_date: '01 Aug, 2024 - 02 Aug, 2024',exam_des: 'Lorem Ipsum dummy text here...',publish:true ,action: ''},
  { event_title:'15 Aug Celebration', event_date: '01 Aug, 2024 - 02 Aug, 2024',exam_des: 'Lorem Ipsum dummy text here...',publish:false,action: ''},
  { event_title:'15 Aug Celebration', event_date: '01 Aug, 2024 - 02 Aug, 2024',exam_des: 'Lorem Ipsum dummy text here...',publish:true ,action: ''}
]

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})

export class EventComponent implements OnInit{
  //  EVENT_DATA: complaintComponent[]=[] ;
  searchSize: any = "";
  displayedColumns: string[] = ['event_title', 'event_date', 'exam_des', 'publish', 'action'];
  // eventData = new MatTableDataSource<eventComponent>(this.EVENT_DATA);
  eventData = EVENT_DATA;
  selection = new SelectionModel<eventComponent>(true, []);
  isTableLoading: boolean = false;
  pageNo: any;
  limit: any;
  totalCoupon: any;

constructor(private _router:Router, 
  private _dialog:MatDialog,
  private _couponService:ClassService,
  private _globalFunctions:GlobalFunctions
){}

ngOnInit(): void {
  this.getAllCouponList();
}

getAllCouponList(event:any = ''){
  // this.isTableLoading = true;
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
      // this.EVENT_DATA = result.Data.docs;
      // this.couponData = new MatTableDataSource<eventComponent>(this.EVENT_DATA);
      // this.couponData.sort = this.couponSort;
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

addEvent(){
  this._router.navigate(['event/', 'eventdetails']);
}

editEvent(event:any, resData:any){
  event.stopPropagation();
  this._router.navigate(['event/', resData?.id]);
}

deleteEvent(resData:any){
  // this.isTableLoading = true;
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
