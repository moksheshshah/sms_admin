import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin-user.component';
import { RouterModule, Routes } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PaginatorModule } from 'primeng/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { AddEditAdminComponent } from './add-edit-admin/add-edit-admin.component';
import { DropdownModule } from 'primeng/dropdown';

const routes:Routes = [
  {
    path:'',
    component:AdminUserComponent,
  },
  {
    path:'adminuserdetail',
    component:AddEditAdminComponent,
  }
]

@NgModule({
  declarations: [
    AdminUserComponent,
    AddEditAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    PaginatorModule,
    MatFormFieldModule,
    MatOptionModule
  ]
})
export class AdminUserModule { }
