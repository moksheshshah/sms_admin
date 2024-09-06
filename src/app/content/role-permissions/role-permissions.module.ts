import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionsComponent } from './role-permissions.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaginatorModule } from 'primeng/paginator';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes:Routes = [
  {
    path:'',
    component:RolePermissionsComponent,
  },
  {
    path:'asginpermission',
    component:AssignPermissionComponent,
  }
]

@NgModule({
  declarations: [
    RolePermissionsComponent,
    AddEditRoleComponent,
    AssignPermissionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    PaginatorModule,
    MatCheckboxModule
  ]
})
export class RolePermissionsModule { }
