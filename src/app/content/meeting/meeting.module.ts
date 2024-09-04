import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AddEditMeetingComponent } from './add-edit-meeting/add-edit-meeting.component';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PaginatorModule } from 'primeng/paginator';

const routes:Routes = [
  {
    path:'',
    component:MeetingComponent,
  },
  {
    path:':id',
    component:AddEditMeetingComponent,
  }
]

@NgModule({
  declarations: [
    MeetingComponent,
    AddEditMeetingComponent
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
    PaginatorModule
  
  ]
})
export class MeetingModule { }
