import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

const routes:Routes = [
  {
    path:'',
    component:DashboardComponent,
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgChartsModule,
    MatTableModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule,
    MatSortModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    PaginatorModule,
    NgxDaterangepickerMd.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'input' } } },
  ],
})
export class DashboardModule { }
