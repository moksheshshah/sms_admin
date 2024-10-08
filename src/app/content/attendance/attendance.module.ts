import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentAttendanceListComponent } from './student-attendance-list/student-attendance-list.component';
import { teacherAttendanceListComponent } from './teacher-attendance-list/teacher-attendance-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatorModule } from 'primeng/paginator';
import { TeacherTakeAttendanceComponent } from './teacher-attendance-list/teacher-take-attendance/teacher-take-attendance.component';
import { StudentTakeAttendanceComponent } from './student-take-attendance/student-take-attendance.component';

const routes:Routes = [
  {
    path:'',
    component:AttendanceComponent,
  },
  {
    path:'studenttakeattendance',
    component:StudentTakeAttendanceComponent,
  },
  {
    path:'teachertakeattendance',
    component:TeacherTakeAttendanceComponent,
  }
]

@NgModule({
  declarations: [
    AttendanceComponent,
    StudentAttendanceListComponent,
    teacherAttendanceListComponent,
    TeacherTakeAttendanceComponent,
    StudentTakeAttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule,
    MatInputModule,
    FormsModule,
    InputTextModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    PaginatorModule
  ]
})
export class AttendanceModule { }
