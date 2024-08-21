import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTimetableComponent } from './create-timetable.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:CreateTimetableComponent,
  }
]

@NgModule({
  declarations: [
    CreateTimetableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CreateTimetableModule { }
