import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { SchoolsService } from '../../schools/schools.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { CONSTANTS } from '../../../common/constants';

@Component({
  selector: 'app-add-edit-homework',
  templateUrl: './add-edit-homework.component.html',
  styleUrl: './add-edit-homework.component.scss'
})
export class AddEditHomeworkComponent {
  isUpload: boolean = false;
  isBtnLoading: boolean = false;
  productCouponForm: any = FormGroup;
  constants: any = CONSTANTS;
  selectedItemImg: any;
  couponId: any;
  varientsList: any = [];
  @ViewChild('couponNgForm') couponNgForm: any;
  @ViewChild('allSelected') allSelected: MatOption | any;
  maultivariants: any = [];
religionList: any;
classList:any = [
  { key:'1st', value:'1' }, 
  { key:'2nd', value:'2' }, 
  { key:'3rd', value:'3' }, 
  { key:'4th', value:'4' }, 
  { key:'5th', value:'5' }, 
];
sectionList:any = [
  { key:'A', value:'A' }, 
  { key:'B', value:'B' }, 
  { key:'C', value:'C' }, 
  { key:'D', value:'D' }, 
  { key:'E', value:'E' }, 
];
subjectList:any = [
  { key:'Enaglish', value:'english' }, 
  { key:'Hindi', value:'hindi' }, 
  { key:'Gujrati', value:'gujrati' }, 
  { key:'Science', value:'science' }, 
];
editor !: Editor;
toolbar: Toolbar = [['bold', 'italic'], ['underline', 'strike'], ['code', 'blockquote'], ['ordered_list', 'bullet_list'], [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }], ['link', 'image'], ['text_color', 'background_color'], ['align_left', 'align_center', 'align_right', 'align_justify'],];
ingredient_length: any = 0;

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
    this.editor = new Editor();
    this.getVarients();
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

  getVarients() {
    this._bannerService.getAllVarientList().subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.varientsList = result.Data;
      } else {
        this.isBtnLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isBtnLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    })
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
      subjcet: [''],
      class: ['', [Validators.required]],
      section: ['', [Validators.required]],
      homework_date: ['', [Validators.required]],
      submission_date: ['', [Validators.required]],
      description: [''],
      attach_fill: [''],

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

  uploadItemImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!this.constants.imagearray.includes(file.type)) {
        this._toastr.clear();
        this._toastr.error(
          'File type is not allowed.',
          'Error'
        );
        return;
      }

      if (file.size / 1024 / 1024 <= 5) {
        const fileObj: any = new FormData();
        fileObj.append('file', file);
        this._couponService.uploadCoupon(fileObj).subscribe(
          (result: any) => {
            if (result && result.IsSuccess) {
              this.selectedItemImg = result.Data.path;
              this.isUpload = true;
              const itemImageFormControl = this.productCouponForm.get('banner');
              itemImageFormControl.setValue(result.Data.path);

              this._toastr.clear();
              this._toastr.success(result.Message, 'Success');
            } else {
              this._globalFunctions.successErrorHandling(result, this, true);
            }
          },
          (error: any) => {
            this._globalFunctions.errorHanding(error, this, true);
          }
        );
      } else {
        this._toastr.error('File Is Bigger Than 5MB ', 'Error');
      }
    }
  }

  removeFillAvatar(): void {
    const itemFillImageFormControl = this.productCouponForm.get('banner');
    itemFillImageFormControl.setValue(null);
    this.selectedItemImg = null;
  }

  imageOnError(event: any) {
    event.target.src = this.constants.defaultImage;
  }

  ingredientLength(event: any = '') {
    this.ingredient_length = event.length
    if (event.length > 10000) {
      this._toastr.clear();
      this._toastr.error("You can not write more product description", 'Oops!');
    }
  }
  
}
