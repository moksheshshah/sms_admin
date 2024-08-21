import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ImageModule } from 'primeng/image';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgImageSliderService } from 'ng-image-slider';
import { NgImageSliderModule } from 'ng-image-slider';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'sm-dashboard'
  },
  {
    path:'sm-dashboard',
    loadChildren: () => import('./sm-dashboard/sm-dashboard.module').then(m=>m.SmDashboardModule)
  },
];

@NgModule({
  declarations: [
    ContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule,
    MatSortModule,
    ReactiveFormsModule,
    InputTextareaModule ,
    InputTextModule,
    PaginatorModule,
    ColorPickerModule,
    ImageModule,
    RadioButtonModule ,
    NgChartsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgImageSliderModule
  ],
  providers:[NgImageSliderService]
})
export class ContentModule { }
