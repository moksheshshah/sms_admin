import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader, TranslateService } from  '@ngx-translate/core';
import { TranslateHttpLoader } from  '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogInComponent } from './auth/log-in/log-in.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { GlobalFunctions } from './common/global-function';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgImageSliderModule, NgImageSliderService } from 'ng-image-slider';
import { ToastrModule } from 'ngx-toastr';


// Loader of Translate language module
export function HttpLoaderFactory(http:  HttpClient) {
  return new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    RatingModule,
    FormsModule,
    DropdownModule,
    ImageModule,
    SwiperModule,
    MatExpansionModule,
    PaginatorModule,
    ProgressBarModule,
    MatTableModule,
    ColorPickerModule,
    MatSelectModule,
    NgxEditorModule,
    RadioButtonModule,
    NgChartsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgImageSliderModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
  ],
  providers: [
    GlobalFunctions,
    DatePipe,
    { provide: window, useValue: window },
    TranslateService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-Gb'},
    NgImageSliderService
  ],
  exports: [
    AppComponent,
    TranslateModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
