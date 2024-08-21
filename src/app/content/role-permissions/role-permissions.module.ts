import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionsComponent } from './role-permissions.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:RolePermissionsComponent,
  }
]

@NgModule({
  declarations: [
    RolePermissionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RolePermissionsModule { }
