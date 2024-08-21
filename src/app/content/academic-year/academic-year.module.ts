import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicYearComponent } from './academic-year.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:AcademicYearComponent
  }
]

@NgModule({
  declarations: [
    AcademicYearComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AcademicYearModule { }
