import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeInvoicesComponent } from './fee-invoices.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:FeeInvoicesComponent,
  }
]

@NgModule({
  declarations: [
    FeeInvoicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FeeInvoicesModule { }
