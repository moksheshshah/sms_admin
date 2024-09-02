import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeInvoicesComponent } from './fee-invoices.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddEditFeeInvoiceComponent } from './add-edit-fee-invoice/add-edit-fee-invoice.component';

const routes:Routes = [
  {
    path:'',
    component:FeeInvoicesComponent,
  },
  {
    path:':id',
    component:AddEditFeeInvoiceComponent,
  }
]

@NgModule({
  declarations: [
    FeeInvoicesComponent,
    AddEditFeeInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule,
    InputTextModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    PaginatorModule,
    MatNativeDateModule,
    InputSwitchModule,
    InputTextareaModule
  ]
})
export class FeeInvoicesModule { }
