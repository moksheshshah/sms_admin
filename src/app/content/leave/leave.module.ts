import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from './leave.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { PaginatorModule } from 'primeng/paginator';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { ViewLeaveDetailsComponent } from './view-leave-details/view-leave-details.component';

const routes:Routes = [
  {
    path:'',
    component:LeaveComponent,
  },
  {
    path:':id',
    component:ViewLeaveDetailsComponent,
  }
]

@NgModule({
  declarations: [
    LeaveComponent,
    LeaveRequestsComponent,
    LeaveTypeComponent,
    ViewLeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    PaginatorModule
  ]
})
export class LeaveModule { }
