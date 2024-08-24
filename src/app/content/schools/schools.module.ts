import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsComponent } from './schools.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ImageModule } from 'primeng/image';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxEditorModule } from 'ngx-editor';
import { AddEditSchoolsComponent } from './add-edit-schools/add-edit-schools.component';

const routes:Routes = [
  {
    path:'',
    component:SchoolsComponent
  },
  {
    path:':id',
    component:AddEditSchoolsComponent
  }
]

@NgModule({
  declarations: [
    SchoolsComponent,
    AddEditSchoolsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    // InputTextModule,
    // InputTextareaModule,
    PaginatorModule,
    InputSwitchModule,
    MatSelectModule,
    ImageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxEditorModule
  ]
})
export class SchoolsModule { }
