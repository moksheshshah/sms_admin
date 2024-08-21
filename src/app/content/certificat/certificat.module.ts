import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatComponent } from './certificat.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:CertificatComponent
  }
]

@NgModule({
  declarations: [
    CertificatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CertificatModule { }
