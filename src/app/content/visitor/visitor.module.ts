import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorComponent } from './visitor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { PaginatorModule } from 'primeng/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditVisitorComponent } from './edit-visitor/edit-visitor.component';

const routes:Routes = [
  {
    path:'',
    component:VisitorComponent,
  },
  {
    path:':id',
    component:EditVisitorComponent,
  }
]

@NgModule({
  declarations: [
    VisitorComponent,
    EditVisitorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PaginatorModule
  ]
})
export class VisitorModule { }
