import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintComponent } from './complaint.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes:Routes = [
  {
    path:'',
    component:ComplaintComponent,
  },
  {
    path:'complaintdetails',
    component:ComplaintDetailsComponent,
  }
]

@NgModule({
  declarations: [
    ComplaintComponent,
    ComplaintDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    PaginatorModule,
    InputSwitchModule
  ]
})
export class ComplaintModule { }
