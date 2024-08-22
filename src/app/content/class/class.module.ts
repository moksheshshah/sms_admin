import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSortModule } from '@angular/material/sort';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { AddEditClassComponent } from './add-edit-class/add-edit-class.component';

const routes:Routes = [
  {
    path:'',
    component:ClassComponent
  }
]

@NgModule({
  declarations: [
    ClassComponent,
    AddEditClassComponent,
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
    PaginatorModule 
  ]
})
export class ClassModule { }
