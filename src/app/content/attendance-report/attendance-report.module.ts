import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceReportComponent } from './attendance-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:AttendanceReportComponent,
  }
]

@NgModule({
  declarations: [
    AttendanceReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AttendanceReportModule { }
