import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarksComponent } from './marks.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditMarkComponent } from './edit-mark/edit-mark.component';
import { MatTableModule } from '@angular/material/table';

const routes:Routes = [
  {
    path:'',
    component:MarksComponent,
  },
  {
    path:'markdetails',
    component:EditMarkComponent,
  }
]

@NgModule({
  declarations: [
    MarksComponent,
    EditMarkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MatInputModule,
    MatSelectModule,
    InputTextModule,
    MatDatepickerModule,
    InputSwitchModule,
    MatTableModule
  ]
})
export class MarksModule { }
