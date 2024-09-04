import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.scss'
})
export class MarksComponent {
  totalCoupon:any;
  searchCoupon:any;
  displayedColumns:string[]=['day','lec_one','lec_two','lec_three','lec_four','breck','lec_five','lec_six','lec_seven','lec_eight'];
  // stdTimetableData = new MatTableDataSource<sutdentTimetableComponent>(this.STDTIMETABLE_DATA);
  stdTimetableData = STDTIMETABLE_DATA; 
  selection = new SelectionModel<sutdentTimetableComponent>(true , []);
  isTableLoading: any;
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

  constructor(private _router:Router){}

  editExamMark(){
    this._router.navigate(['/marks', 'markdetails']);
  }

  printMarksheet(){
    this._router.navigate(['/marks', 'printmarksheet']);
  }

}
