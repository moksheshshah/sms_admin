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
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { StudentCreateTimetableComponent } from './student-create-timetable/student-create-timetable.component';
import { StudentNextTimetableComponent } from './student-next-timetable/student-next-timetable.component';
import { TeacherCreateTimetableComponent } from './teacher-create-timetable/teacher-create-timetable.component';
import { TeacherNextTimetableComponent } from './teacher-next-timetable/teacher-next-timetable.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


const routes:Routes = [
  {
    path:'',
    component:TimetableComponent,
  },
  {
    path:'studentcreatetimetable',
    component:StudentCreateTimetableComponent,
  },
  {
    path:'studentdata/studentnexttimetable',
    component:StudentNextTimetableComponent
  },
  {
    path:'teachercreatetimetable',
    component:TeacherCreateTimetableComponent
  },
  {
    path:'teacherdata/teachernexttimetable',
    component:TeacherNextTimetableComponent
  },
]

@NgModule({
  declarations: [
    TimetableComponent,
    StudentTimetableListComponent,
    TeacherTimetableListComponent,
    StudentCreateTimetableComponent,
    StudentNextTimetableComponent,
    TeacherCreateTimetableComponent,
    TeacherNextTimetableComponent
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
    ImageModule,
    PaginatorModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class TimetableModule { }
