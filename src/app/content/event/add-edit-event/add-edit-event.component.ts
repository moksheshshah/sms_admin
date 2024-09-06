import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '../../../common/constants';
import { MatOption } from '@angular/material/core';
import { SchoolsService } from '../../schools/schools.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalFunctions } from '../../../common/global-function';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrl: './add-edit-event.component.scss'
})
export class AddEditEventComponent {
  isUpload: boolean = false;
  isBtnLoading: boolean = false;
  pageType: any = "Add new";
  eventForm: any = FormGroup;
  constants: any = CONSTANTS;
  selectedItemImg: any;
  couponId: any;
  editor !: Editor;
  toolbar: Toolbar = [['bold', 'italic'], ['underline', 'strike'], ['code', 'blockquote'], ['ordered_list', 'bullet_list'], [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }], ['link', 'image'], ['text_color', 'background_color'], ['align_left', 'align_center', 'align_right', 'align_justify'],];
  ingredient_length: any = 0;
  @ViewChild('allSelected') allSelected: MatOption | any;
  @ViewChild('couponNgForm') couponNgForm: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _couponService: SchoolsService,
    private _toastr: ToastrService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.editor = new Editor();
    this.prepareAddEditExpenseForm();
    this.couponId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.couponId && this.couponId != "studentdetail") {
      this.pageType = "Edit";
    }
  }

  prepareAddEditExpenseForm() {
    this.eventForm = this._formBuilder.group({
      photo:['',Validators.required],
      event_title: ['',Validators.required],
      from_date: ['',Validators.required],
      to_date: ['',Validators.required],
      description: ['', Validators.required],
    });
  }

  setCouponData(data: any) {
    // let variantsIds: any = [];
    // data?.variant.map((item: any) => {
    //   variantsIds.push(item._id);
    // })
    this.eventForm.get('variant').setValue(data?.variant?._id);
    this.eventForm.get('banner').setValue(data.banner);
    this.selectedItemImg = data.banner ? data.banner : '';
    this.eventForm.get('name').setValue(data.name);
    this.eventForm.get('coupon_code').setValue(data.coupon_code);
    this.eventForm.get('currency').setValue(data.currency);
    this.eventForm.get('maxlimit').setValue(data.maxlimit);
    this.eventForm.get('userlimit').setValue(data.userlimit);
    this.eventForm.get('discount_type').setValue(data.discount_type);
    this.eventForm.get('discount').setValue(data.discount);
    this.eventForm.get('starttime').setValue(new Date(data.starttime));
    this.eventForm.get('endtime').setValue(new Date(data.endtime));
    this.eventForm.get('webview').setValue(data.iswebview);
    this.eventForm.get('mobileview').setValue(data.ismobileview);
    this.eventForm.get('brief').setValue(data.brief);
    this.eventForm.get('tc').setValue(data.tc);
  }

  onSubmitAction(): void {
    this.isBtnLoading = true;
    if (this.eventForm.invalid) {
      Object.keys(this.eventForm.controls).forEach((key) => {
        this.eventForm.controls[key].touched = true;
        this.eventForm.controls[key].markAsDirty();
      });
      return;
    }
    if (!this.eventForm.valid) {
      this._toastr.clear();
      this._toastr.error('Please enter valid data.', 'Oops!');
      this.isBtnLoading = false;
      return;
    }

    const couponDataObj: any = {
      couponid: this.couponId != "productcoupondetail" ? this.couponId : "",
      banner: this.eventForm.value.banner,
      name: this._globalFunctions.toTitleCase(this.eventForm.value.name),
      coupon_code: this._globalFunctions.toUpperCase(this.eventForm.value.coupon_code),
      currency: this._globalFunctions.toUpperCase(this.eventForm.value.currency),
      starttime: this.eventForm.value.starttime ? moment(this.eventForm.value.starttime).format('DD-MM-YYYY') : null,
      endtime: this.eventForm.value.starttime ? moment(this.eventForm.value.endtime).format('DD-MM-YYYY') : null,
      variant: this.eventForm.value.variant || [],
      userlimit: this.eventForm.value.userlimit,
      maxlimit: parseInt(this.eventForm.value.maxlimit),
      discount_type: this.eventForm.value.discount_type,
      discount: parseInt(this.eventForm.value.discount),
      iswebview: this.eventForm.value.webview,
      ismobileview: this.eventForm.value.mobileview,
      brief: this.eventForm.value.brief,
      tc: this.eventForm.value.tc,
    }
    this.eventForm.disable();
    this._couponService.saveProductCoupon(couponDataObj).subscribe(
      (result: any) => {
        if (result && result.IsSuccess) {
          this._toastr.clear();
          this._toastr.success(result.Message, 'Success');
          this.isBtnLoading = false;
          this._router.navigate(['productcoupon']);
        } else {
          this.eventForm.enable();
          this._globalFunctions.successErrorHandling(result, this, true);
          this.isBtnLoading = false;
        }
      },
      (error: any) => {
        this.eventForm.enable();
        this._globalFunctions.errorHanding(error, this, true);
        this.isBtnLoading = false;
      }
    );
  }

  uploadItemImage(event: any,type:any): void {
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
        this._couponService.getImage(fileObj).subscribe(
          (result: any) => {
            if (result && result.IsSuccess) {
              if(type === 'studentImg'){
                this.selectedItemImg = result.Data.imagePath;
                this.isUpload = true;
                const itemImageFormControl = this.eventForm.get('photo');
                itemImageFormControl.setValue(result.Data.imagePath);
              }else

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

  removeFillAvatar(type:any): void {
    if(type == 'studentImg'){
      const itemFillImageFormControl = this.eventForm.get('photo');
      itemFillImageFormControl.setValue(null);
      this.selectedItemImg = null;
    }
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
