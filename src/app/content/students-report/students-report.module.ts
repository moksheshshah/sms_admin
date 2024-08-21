import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsReportComponent } from './students-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:StudentsReportComponent,
  }
]

@NgModule({
  declarations: [
    StudentsReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentsReportModule { }
