import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxEditorModule } from 'ngx-editor';
import { MatTableModule } from '@angular/material/table';
import { ImportStudentsComponent } from './import-students/import-students.component';
import { StudentAttendanceListComponent } from './student-attendance-list/student-attendance-list.component';
import { StudentFeeListComponent } from './student-fee-list/student-fee-list.component';
import { StudentExaminationListComponent } from './student-examination-list/student-examination-list.component';
import { MatTabsModule } from '@angular/material/tabs';

const routes:Routes = [
  {
    path:'',
    component:StudentComponent,
  },
  {
    path:':id',
    component:AddEditStudentComponent,
  },
  {
    path:'studentdata/importStudents',
    component:ImportStudentsComponent,
  },
]

@NgModule({
  declarations: [
    StudentComponent,
    AddEditStudentComponent,
    ImportStudentsComponent,
    StudentAttendanceListComponent,
    StudentFeeListComponent,
    StudentExaminationListComponent
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
    PaginatorModule,
    InputSwitchModule,
    MatSelectModule,
    ImageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxEditorModule,
    MatTabsModule
  ]
})
export class StudentModule { }
