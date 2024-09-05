import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsReportComponent } from './students-report.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes:Routes = [
  {
    path:'',
    component:StudentsReportComponent,
  }
]

@NgModule({
  declarations: [
    StudentsReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule,
    PaginatorModule,
    ImageModule,
    InputSwitchModule

  ]
})
export class StudentsReportModule { }
