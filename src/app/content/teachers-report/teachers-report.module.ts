import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersReportComponent } from './teachers-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:TeachersReportComponent,
  }
]

@NgModule({
  declarations: [
    TeachersReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TeachersReportModule { }
