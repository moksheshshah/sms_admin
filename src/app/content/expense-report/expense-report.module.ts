import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseReportComponent } from './expense-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:ExpenseReportComponent,
  }
]

@NgModule({
  declarations: [
    ExpenseReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ExpenseReportModule { }
