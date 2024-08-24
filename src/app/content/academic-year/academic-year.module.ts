import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicYearComponent } from './academic-year.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSortModule } from '@angular/material/sort';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ImageModule } from 'primeng/image';
import { AddEditAcademicYearComponent } from './add-edit-academic-year/add-edit-academic-year.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

const routes:Routes = [
  {
    path:'',
    component:AcademicYearComponent
  }
]

@NgModule({
  declarations: [
    AcademicYearComponent,
    AddEditAcademicYearComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule,
    MatSortModule,
    ReactiveFormsModule,
    InputTextareaModule ,
    InputTextModule,
    PaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ImageModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class AcademicYearModule { }
