import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../common-modal/common-modal.component';

export interface noticeComponent {
no:any
 title: any;
 description: any;
 creation_date: any;
 action: any;
}

const STDATTENDANCE_DATA:noticeComponent[]=[
  { no:1, title: 'Diwali Vacation',description: 'Diwali Vacation start 02 Jul,2024 to 31 Jul,2024',creation_date: '01 Aug, 2024', action: '',},
  { no:2, title: 'Diwali Vacation',description: 'Diwali Vacation start 02 Jul,2024 to 31 Jul,2024',creation_date: '01 Aug, 2024', action: '',},
  { no:3, title: 'Diwali Vacation',description: 'Diwali Vacation start 02 Jul,2024 to 31 Jul,2024',creation_date: '01 Aug, 2024', action: '',},
  { no:4, title: 'Diwali Vacation',description: 'Diwali Vacation start 02 Jul,2024 to 31 Jul,2024',creation_date: '01 Aug, 2024', action: '',}
];

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {
   // NOTICE_DATA: meetingComponent[]=[] ;
   totalSizeData: any;
   searchSize: any = "";
   displayedColumns: string[] = ['no', 'title', 'description', 'creation_date', 'action'];
   // noticeData = new MatTableDataSource<meetingComponent>(this.NOTICE_DATA);
   noticeData = STDATTENDANCE_DATA;
   selection = new SelectionModel<noticeComponent>(true, []);
   isTableLoading: boolean = false;
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
   statusList:any = [
     { key:'Select Status', value:'' }, 
     { key:'Paid', value:'paid' }, 
     { key:'Unpaid', value:'unpaid' }, 
     { key:'Partially Paid', value:'partiallypaid' }, 
   ];
   selectedClass: any;
   selectedSection: any;
   selectedStatus: any;
 
   constructor(private _router:Router, 
     private _dialog:MatDialog
   ){}
 
   addNotice(){
     this._router.navigate(['notice/', 'noticedetails']);
   }
 
   editNotice(event:any, resData:any){
     event.stopPropagation();
     this._router.navigate(['notice/', resData?.id]);
   }
 
   deleteNotice(resData:any){
     this.isTableLoading = true;
     const dialogRef = this._dialog.open(CommonModalComponent,{
       width:'410px',
       height:'fit-content',
       data:{
         title:'Confirmation!',
         message:'Are You Sure You Want To Delete Notice Record ?',
         buttonNames:[{firstBtn:"Cancel",secondBtn:'Yes, Delete'}]
       }
     });
     dialogRef.afterClosed().subscribe((res)=>{
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
     }
     this.isTableLoading = false;
     });
   }
}
