import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes:Routes = [
  {
    path:'',
    component:EventComponent,
  }
]

@NgModule({
  declarations: [
    EventComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    InputSwitchModule
  ]
})
export class EventModule { }
