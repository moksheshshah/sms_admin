import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersReportComponent } from './teachers-report.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';

const routes:Routes = [
  {
    path:'',
    component:TeachersReportComponent,
  }
]

@NgModule({
  declarations: [
    TeachersReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ImageModule,
    PaginatorModule
  ]
})
export class TeachersReportModule { }
