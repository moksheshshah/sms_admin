import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './timetable.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentTimetableListComponent } from './student-timetable-list/student-timetable-list.component';
import { TeacherTimetableListComponent } from './teacher-timetable-list/teacher-timetable-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes:Routes = [
  {
    path:'',
    component:TimetableComponent,
  }
]

@NgModule({
  declarations: [
    TimetableComponent,
    StudentTimetableListComponent,
    TeacherTimetableListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TimetableModule { }
