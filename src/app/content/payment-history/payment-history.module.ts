import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentHistoryComponent } from './payment-history.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

const routes:Routes = [
  {
    path:'',
    component:PaymentHistoryComponent,
  }
]

@NgModule({
  declarations: [
    PaymentHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule,
    InputTextModule,
    FormsModule,
    PaginatorModule,
    InputSwitchModule,
    InputTextareaModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class PaymentHistoryModule { }
