import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeReportComponent } from './income-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:IncomeReportComponent,
  }
]

@NgModule({
  declarations: [
    IncomeReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class IncomeReportModule { }
