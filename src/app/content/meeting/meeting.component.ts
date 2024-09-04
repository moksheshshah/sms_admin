import { Component } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

export interface meetingComponent {
  meeting_title:any
  meeting_agenda: any;
  meeting_date_time: any;
  meeting_type: any;
  location_link: any;
  action: any;
  }
  const STDATTENDANCE_DATA:meetingComponent[]=[
    { meeting_title:'Parent Meeting', meeting_agenda: 'Discuss About student study',meeting_date_time: '01 Aug, 2024 10:00 PM',meeting_type: 'Online',location_link:'zoommtg://zoom.us/join?confno=8529015944...' ,action: ''},
    { meeting_title:'Parent Meeting', meeting_agenda: 'Discuss About student study',meeting_date_time: '01 Aug, 2024 10:00 PM',meeting_type: 'Offline',location_link:'Room No-1' ,action: ''},
    { meeting_title:'Parent Meeting', meeting_agenda: 'Discuss About student study',meeting_date_time: '01 Aug, 2024 10:00 PM',meeting_type: 'Online',location_link:'zoommtg://zoom.us/join?confno=8529015944...',action: ''},
    { meeting_title:'Parent Meeting', meeting_agenda: 'Discuss About student study',meeting_date_time: '01 Aug, 2024 10:00 PM',meeting_type: 'Online',location_link:'zoommtg://zoom.us/join?confno=8529015944...',action: ''}
  ];
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.scss'
})
export class MeetingComponent {
//  MEETING_DATA: meetingComponent[]=[] ;
 totalSizeData: any;
 searchSize: any = "";
 displayedColumns: string[] = ['meeting_title', 'meeting_agenda', 'meeting_date_time', 'meeting_type','location_link', 'action'];
 // noticeData = new MatTableDataSource<meetingComponent>(this.meetingData);
 meetingData = STDATTENDANCE_DATA;
 selection = new SelectionModel<meetingComponent>(true, []);
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
limit: any;

 constructor(private _router:Router, 
   private _dialog:MatDialog
 ){}

 addMeeting(){
   this._router.navigate(['meeting/', 'meetingdetails']);
 }

 editMeeting(event:any, resData:any){
   event.stopPropagation();
   this._router.navigate(['meeting/', resData?.id]);
 }

 deleteMeeting(resData:any){
   this.isTableLoading = true;
   const dialogRef = this._dialog.open(CommonModalComponent,{
     width:'410px',
     height:'fit-content',
     data:{
       title:'Confirmation!',
       message:'Are You Sure You Want To Delete Meeting Record ?',
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
   }
   this.isTableLoading = false;
   });
 }

}
