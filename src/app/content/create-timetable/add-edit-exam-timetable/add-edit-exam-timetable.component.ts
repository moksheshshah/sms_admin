import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { CONSTANTS } from '../../../common/constants';
import { MatOption } from '@angular/material/core';
import { SchoolsService } from '../../schools/schools.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-exam-timetable',
  templateUrl: './add-edit-exam-timetable.component.html',
  styleUrl: './add-edit-exam-timetable.component.scss'
})
export class AddEditExamTimetableComponent {
  isUpload: boolean = false;
  isBtnLoading: boolean = false;
  examTimetableForm: any = FormGroup;
  @ViewChild('couponNgForm') couponNgForm: any;
  constants: any = CONSTANTS;
  selectedItemImg: any;
  couponId: any;
  varientsList: any = [];
  @ViewChild('allSelected') allSelected: MatOption | any;
  maultivariants: any = [];
classList:any = [
  { key:'Class 1', value:'1' }, 
  { key:'Class 2', value:'2' }, 
  { key:'Class 3', value:'3' }, 
  { key:'Class 4', value:'4' }, 
  { key:'Class 5', value:'5' }, 
];
sectionList:any = [
  { key:'A', value:'A' }, 
  { key:'B', value:'B' }, 
  { key:'C', value:'C' }, 
  { key:'D', value:'D' }, 
  { key:'E', value:'E' }, 
];
  picker2: any;
  picker3: any;
  selectedTimes: any;
  exampepar_details: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _couponService: SchoolsService,
    private _toastr: ToastrService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _bannerService: SchoolsService
  ) { }

  ngOnInit() {
    this.prepareAddEditExpenseForm();
    this.couponId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.couponId != "productcoupondetail") {
      let param = {
        couponid: this.couponId
      }

      // this._couponService.getProductCouponById(param).subscribe((result: any) => {
      //   if (result && result.IsSuccess) {
      //     this.setCouponData(result?.Data);
      //   } else {
      //     this._globalFunctions.successErrorHandling(result, this, true);
      //   }
      // }, (error: any) => {
      //   this._globalFunctions.errorHanding(error, this, true);
      // });
    }
  }


  prepareAddEditExpenseForm() {
    this.examTimetableForm = this._formBuilder.group({
      exam_title: ['', Validators.required],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      class: ['', [Validators.required]],
      section: ['', [Validators.required]],
      examPeparsForm: this._formBuilder.array([this.addMoreRows()])
    });
    this.exampepar_details = this.examTimetableForm.controls['examPeparsForm']as FormArray;
  }

  get exampPeparGroup(){
    return this.examTimetableForm.controls['examPeparsForm']as FormArray;
  }

  addMoreRows(){
    return this._formBuilder.group({
      subject_name: ['', [Validators.required]],
      exam_center: ['', [Validators.required]],
      total_marks: ['', [Validators.required]],
      passing_marks: ['', [Validators.required]],
      subject_code: ['', [Validators.required]],
      paper_date: ['', [Validators.required]],
      starttime: ['', [Validators.required]],
      endtime: ['', [Validators.required]],
      room_number: [''],
    })
  }
  
  createExamtimetable(){
    this.examTimetableForm.get('examPeparsForm').controls.forEach((element: any, index: any) => {
      if (this.examTimetableForm.get('examPeparsForm').invalid) {
        Object.keys(element.controls).forEach((key) => {
          this.examTimetableForm.get('examPeparsForm').controls[index].controls[key].touched = true;
          this.examTimetableForm.get('examPeparsForm').controls[index].controls[key].markAsDirty();
        });
        return;
      }
    });
    if (this.exampepar_details.value.length && this.examTimetableForm.get('examPeparsForm').valid) {
      this.exampepar_details.push(this.addMoreRows());
    }
  }

  onSubmitAction(): void {
    // this.isBtnLoading = true;
    console.log(this.examTimetableForm.value);
    
  }


}
