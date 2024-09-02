import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  productCouponForm: any = FormGroup;
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

  tosslePerOne(all: any): any {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.productCouponForm.controls.variant.value.length == this.varientsList.length)
      this.allSelected.select();
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.productCouponForm.controls.variant.patchValue([...this.varientsList.map((item: any) => item._id), 0]);
    } else {
      this.productCouponForm.controls.variant.patchValue([]);
    }
  }

  prepareAddEditExpenseForm() {
    this.productCouponForm = this._formBuilder.group({
      exam_title: ['', Validators.required],
      starttime: ['', [Validators.required]],
      endtime: ['', [Validators.required]],
      class: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subject_name: ['', [Validators.required]],
      exam_center: ['', [Validators.required]],
      total_marks: ['', [Validators.required]],
      passing_marks: ['', [Validators.required]],
      subject_code: ['', [Validators.required]],
      paper_date: ['', [Validators.required]],
      room_number: [''],
    });
  }

  setCouponData(data: any) {
    // let variantsIds: any = [];
    // data?.variant.map((item: any) => {
    //   variantsIds.push(item._id);
    // })
    this.productCouponForm.get('variant').setValue(data?.variant?._id);
    this.productCouponForm.get('banner').setValue(data.banner);
    this.selectedItemImg = data.banner ? data.banner : '';
    this.productCouponForm.get('name').setValue(data.name);
    this.productCouponForm.get('coupon_code').setValue(data.coupon_code);
    this.productCouponForm.get('currency').setValue(data.currency);
    this.productCouponForm.get('maxlimit').setValue(data.maxlimit);
    this.productCouponForm.get('userlimit').setValue(data.userlimit);
    this.productCouponForm.get('discount_type').setValue(data.discount_type);
    this.productCouponForm.get('discount').setValue(data.discount);
    this.productCouponForm.get('starttime').setValue(new Date(data.starttime));
    this.productCouponForm.get('endtime').setValue(new Date(data.endtime));
    this.productCouponForm.get('webview').setValue(data.iswebview);
    this.productCouponForm.get('mobileview').setValue(data.ismobileview);
    this.productCouponForm.get('brief').setValue(data.brief);
    this.productCouponForm.get('tc').setValue(data.tc);
  }

  onSubmitAction(): void {
    this.isBtnLoading = true;
    if (this.productCouponForm.invalid) {
      Object.keys(this.productCouponForm.controls).forEach((key) => {
        this.productCouponForm.controls[key].touched = true;
        this.productCouponForm.controls[key].markAsDirty();
      });
      return;
    }
    if (!this.productCouponForm.valid) {
      this._toastr.clear();
      this._toastr.error('Please enter valid data.', 'Oops!');
      this.isBtnLoading = false;
      return;
    }

    const couponDataObj: any = {
      couponid: this.couponId != "productcoupondetail" ? this.couponId : "",
      banner: this.productCouponForm.value.banner,
      name: this._globalFunctions.toTitleCase(this.productCouponForm.value.name),
      coupon_code: this._globalFunctions.toUpperCase(this.productCouponForm.value.coupon_code),
      currency: this._globalFunctions.toUpperCase(this.productCouponForm.value.currency),
      starttime: this.productCouponForm.value.starttime ? moment(this.productCouponForm.value.starttime).format('DD-MM-YYYY') : null,
      endtime: this.productCouponForm.value.starttime ? moment(this.productCouponForm.value.endtime).format('DD-MM-YYYY') : null,
      variant: this.productCouponForm.value.variant || [],
      userlimit: this.productCouponForm.value.userlimit,
      maxlimit: parseInt(this.productCouponForm.value.maxlimit),
      discount_type: this.productCouponForm.value.discount_type,
      discount: parseInt(this.productCouponForm.value.discount),
      iswebview: this.productCouponForm.value.webview,
      ismobileview: this.productCouponForm.value.mobileview,
      brief: this.productCouponForm.value.brief,
      tc: this.productCouponForm.value.tc,
    }
    this.productCouponForm.disable();
    this._couponService.saveProductCoupon(couponDataObj).subscribe(
      (result: any) => {
        if (result && result.IsSuccess) {
          this._toastr.clear();
          this._toastr.success(result.Message, 'Success');
          this.isBtnLoading = false;
          this._router.navigate(['productcoupon']);
        } else {
          this.productCouponForm.enable();
          this._globalFunctions.successErrorHandling(result, this, true);
          this.isBtnLoading = false;
        }
      },
      (error: any) => {
        this.productCouponForm.enable();
        this._globalFunctions.errorHanding(error, this, true);
        this.isBtnLoading = false;
      }
    );
  }


}
