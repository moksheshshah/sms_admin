import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeworkComponent } from './homework.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditHomeworkComponent } from './add-edit-homework/add-edit-homework.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes:Routes = [
  {
    path:'',
    component:HomeworkComponent,
  },
  {
    path:':id',
    component:AddEditHomeworkComponent,
  },
]

@NgModule({
  declarations: [
    HomeworkComponent,
    AddEditHomeworkComponent
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
    // FormControlName
  ]
})
export class HomeworkModule { }
