import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeInvoicesComponent } from './fee-invoices.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddEditFeeInvoiceComponent } from './add-edit-fee-invoice/add-edit-fee-invoice.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { ViewFeeInvoiceComponent } from './view-fee-invoice/view-fee-invoice.component';
import { NgxEditorModule } from 'ngx-editor';

const routes:Routes = [
  {
    path:'',
    component:FeeInvoicesComponent,
  },
  {
    path:':id',
    component:AddEditFeeInvoiceComponent,
  },
  {
    path:'collectfeepage/collectfeesdetails',
    component:CollectFeesComponent,
  }
]

@NgModule({
  declarations: [
    FeeInvoicesComponent,
    AddEditFeeInvoiceComponent,
    CollectFeesComponent,
    ViewFeeInvoiceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    InputSwitchModule,
    InputTextareaModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    PaginatorModule,
    NgxEditorModule
  ]
})
export class FeeInvoicesModule { }
