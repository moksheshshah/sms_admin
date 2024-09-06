import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    // LogInComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class AuthModule { }
