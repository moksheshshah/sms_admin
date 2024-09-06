import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './income.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PaginatorModule } from 'primeng/paginator';
import { AddEditIncomeComponent } from './add-edit-income/add-edit-income.component';
import { NgxEditorModule } from 'ngx-editor';

const routes:Routes = [
  {
    path:'',
    component:IncomeComponent,
  },
  {
    path:':id',
    component:AddEditIncomeComponent,
  }
]

@NgModule({
  declarations: [
    IncomeComponent,
    AddEditIncomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    PaginatorModule,
    NgxEditorModule
  ]
})
export class IncomeModule { }
