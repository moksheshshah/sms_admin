import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSectionComponent } from './add-edit-section/add-edit-section.component';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSortModule } from '@angular/material/sort';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ImageModule } from 'primeng/image';
import { MatInputModule } from '@angular/material/input';

const routes:Routes = [
  {
    path:'',
    component:SectionComponent,
  }
]

@NgModule({
  declarations: [
    SectionComponent,
    AddEditSectionComponent
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
    // InputTextareaModule ,
    // InputTextModule,
    PaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ImageModule
  ]
})
export class SectionModule { }
