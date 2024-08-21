import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationReportComponent } from './examination-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:ExaminationReportComponent,
  }
]

@NgModule({
  declarations: [
    ExaminationReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ExaminationReportModule { }
