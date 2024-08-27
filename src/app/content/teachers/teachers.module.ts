import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxEditorModule } from 'ngx-editor';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';

const routes:Routes = [
  {
    path:'',
    component:TeachersComponent,
  },
  {
    path:':id',
    component:AddEditTeacherComponent,
  },
]

@NgModule({
  declarations: [
    TeachersComponent,
    AddEditTeacherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxEditorModule,
    PaginatorModule,
    ImageModule
  ]
})
export class TeachersModule { }
