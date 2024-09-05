import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditExpanseComponent } from './add-edit-expanse/add-edit-expanse.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { PaginatorModule } from 'primeng/paginator';

const routes:Routes = [
  {
    path:'',
    component:ExpenseComponent,
  },
  {
    path:':id',
    component:AddEditExpanseComponent,
  }
]

@NgModule({
  declarations: [
    ExpenseComponent,
    AddEditExpanseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    PaginatorModule
  ]
})
export class ExpenseModule { }
