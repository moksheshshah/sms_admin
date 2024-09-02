import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTimetableComponent } from './create-timetable.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddEditExamTimetableComponent } from './add-edit-exam-timetable/add-edit-exam-timetable.component';
import { ViewExamTimetableComponent } from './view-exam-timetable/view-exam-timetable.component';

const routes:Routes = [
  {
    path:'',
    component:CreateTimetableComponent,
  },
  {
    path:':id',
    component:AddEditExamTimetableComponent,
  }
]

@NgModule({
  declarations: [
    CreateTimetableComponent,
    AddEditExamTimetableComponent,
    ViewExamTimetableComponent
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
    MatExpansionModule,
  ]
})
export class CreateTimetableModule { }
