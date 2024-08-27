import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-student-timetable-list',
  templateUrl: './student-timetable-list.component.html',
  styleUrl: './student-timetable-list.component.scss',
})
export class StudentTimetableListComponent {
  panelOpenState = false; 
childuserDetails: any;
}
