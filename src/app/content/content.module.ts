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
import { MatIconModule } from '@angular/material/icon';
import { LogInComponent } from '../auth/log-in/log-in.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path:'login',
    component:LogInComponent
  },
  {
    path:'sm-dashboard',
    loadChildren: () => import('./sm-dashboard/sm-dashboard.module').then(m=>m.SmDashboardModule)
  },
  {
    path:'schools',
    loadChildren: () => import('./schools/schools.module').then(m=>m.SchoolsModule)
  },
  {
    path:'ac-year',
    loadChildren: () => import('./academic-year/academic-year.module').then(m=>m.AcademicYearModule)
  },
  {
    path:'branch',
    loadChildren: () => import('./branch/branch.module').then(m=>m.BranchModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path:'class',
    loadChildren: () => import('./class/class.module').then(m=>m.ClassModule)
  },
  {
    path:'section',
    loadChildren: () => import('./section/section.module').then(m=>m.SectionModule)
  },
  {
    path:'subject',
    loadChildren: () => import('./subject/subject.module').then(m=>m.SubjectModule)
  },
  {
    path:'student',
    loadChildren: () => import('./student/student.module').then(m=>m.StudentModule)
  },
  {
    path:'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(m=>m.TeachersModule)
  },
  {
    path:'timetable',
    loadChildren: () => import('./timetable/timetable.module').then(m=>m.TimetableModule)
  },
  {
    path:'attendance',
    loadChildren: () => import('./attendance/attendance.module').then(m=>m.AttendanceModule)
  },
  {
    path:'homework',
    loadChildren: () => import('./homework/homework.module').then(m=>m.HomeworkModule)
  },
  {
    path:'exams',
    loadChildren: () => import('./exams/exams.module').then(m=>m.ExamsModule)
  },
  {
    path:'create-timetable',
    loadChildren: () => import('./create-timetable/create-timetable.module').then(m=>m.CreateTimetableModule)
  },
  {
    path:'marks',
    loadChildren: () => import('./marks/marks.module').then(m=>m.MarksModule)
  },
  {
    path:'fee-invoice',
    loadChildren: () => import('./fee-invoices/fee-invoices.module').then(m=>m.FeeInvoicesModule)
  },
  {
    path:'payment',
    loadChildren: () => import('./payment-history/payment-history.module').then(m=>m.PaymentHistoryModule)
  },
  {
    path:'meeting',
    loadChildren: () => import('./meeting/meeting.module').then(m=>m.MeetingModule)
  },
  {
    path:'notice',
    loadChildren: () => import('./notice/notice.module').then(m=>m.NoticeModule)
  },
  {
    path:'complaint',
    loadChildren: () => import('./complaint/complaint.module').then(m=>m.ComplaintModule)
  },
  {
    path:'leave',
    loadChildren: () => import('./leave/leave.module').then(m=>m.LeaveModule)
  },
  {
    path:'event',
    loadChildren: () => import('./event/event.module').then(m=>m.EventModule)
  },
  {
    path:'visitor',
    loadChildren: () => import('./visitor/visitor.module').then(m=>m.VisitorModule)
  },
  {
    path:'income',
    loadChildren: () => import('./income/income.module').then(m=>m.IncomeModule)
  },
  {
    path:'expense',
    loadChildren: () => import('./expense/expense.module').then(m=>m.ExpenseModule)
  },
  {
    path:'certificate',
    loadChildren: () => import('./certificat/certificat.module').then(m=>m.CertificatModule)
  },
  {
    path:'rpt-student',
    loadChildren: () => import('./students-report/students-report.module').then(m=>m.StudentsReportModule)
  },
  {
    path:'rpt-teachers',
    loadChildren: () => import('./teachers-report/teachers-report.module').then(m=>m.TeachersReportModule)
  },
  {
    path:'rpt-attendance',
    loadChildren: () => import('./attendance-report/attendance-report.module').then(m=>m.AttendanceReportModule)
  },
  {
    path:'rpt-examination',
    loadChildren: () => import('./examination-report/examination-report.module').then(m=>m.ExaminationReportModule)
  },
  {
    path:'rpt-income',
    loadChildren: () => import('./income-report/income-report.module').then(m=>m.IncomeReportModule)
  },
  {
    path:'rpt-expense',
    loadChildren: () => import('./expense-report/expense-report.module').then(m=>m.ExpenseReportModule)
  },
  {
    path:'admin-user',
    loadChildren: () => import('./admin-user/admin-user.module').then(m=>m.AdminUserModule)
  },
  {
    path:'role',
    loadChildren: () => import('./role-permissions/role-permissions.module').then(m=>m.RolePermissionsModule)
  },
  { path: '**', pathMatch:'full',redirectTo:'sm-dashboard' },
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
    NgImageSliderModule,
    MatIconModule
  ],
  providers:[NgImageSliderService]
})
export class ContentModule { }
