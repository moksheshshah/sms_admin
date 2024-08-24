import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';

const routes:Routes = [
  {
    path:'',
    component:StudentComponent,
  }
]

@NgModule({
  declarations: [
    StudentComponent,
    AddEditStudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentModule { }
