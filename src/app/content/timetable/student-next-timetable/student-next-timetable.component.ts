import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-next-timetable',
  templateUrl: './student-next-timetable.component.html',
  styleUrl: './student-next-timetable.component.scss'
})
export class StudentNextTimetableComponent implements OnInit{
  getData:any;
  classList:any = [
    { key:'1st', value:'1' },
    { key:'2nd', value:'2' },
    { key:'3rd', value:'3' },
    { key:'4th', value:'4' }, 
    { key:'5th', value:'5' }, 
  ];
class: any;
classes: any;

  constructor(){}

  ngOnInit(): void {
    this.getData = localStorage.getItem('studentTimeTable');
    console.log("data-->>",this.getData);
    
  }
}
