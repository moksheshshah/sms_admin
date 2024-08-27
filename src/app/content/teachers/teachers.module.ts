import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';

const routes:Routes = [
  {
    path:'',
    component:TeachersComponent,
  }
]

@NgModule({
  declarations: [
    TeachersComponent,
    AddEditTeacherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TeachersModule { }
