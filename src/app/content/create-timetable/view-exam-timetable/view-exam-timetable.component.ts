import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolsService } from '../../schools/schools.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';

@Component({
  selector: 'app-view-exam-timetable',
  templateUrl: './view-exam-timetable.component.html',
  styleUrl: './view-exam-timetable.component.scss'
})
export class ViewExamTimetableComponent {

  constructor(
    private matDialogRef:MatDialogRef<ViewExamTimetableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sizeService: SchoolsService,
    private _toastr: ToastrService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions

  ){}
}
