import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-create-timetable',
  templateUrl: './teacher-create-timetable.component.html',
  styleUrl: './teacher-create-timetable.component.scss'
})
export class TeacherCreateTimetableComponent {
  isBtnLoading: boolean = false;

  constructor(private _router:Router){}

  nextStepTimetables(event:any){
    event.stopPropagation();
    this._router.navigate(['/timetable/teacherdata/teachernexttimetable']);
  }
}
