import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../../class/class.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { CONSTANTS } from '../../../common/constants';

@Component({
  selector: 'app-add-edit-subject',
  templateUrl: './add-edit-subject.component.html',
  styleUrl: './add-edit-subject.component.scss'
})
export class AddEditSubjectComponent {
  isBtnLoading:boolean = false;
  sizeForm: any = FormGroup;
  isBtnChange:boolean = false;
  selectedItemImg: any;
  isUpload: boolean = false;
  constants: any = CONSTANTS;
  sectionList:any = [
    { key:'A', value:'A' }, 
    { key:'B', value:'B' }, 
    { key:'C', value:'C' }, 
    { key:'D', value:'D' }, 
    { key:'E', value:'E' }, 
  ];
  classData: any = [
    { key:'1st', value:'1' },
    { key:'2nd', value:'2' },
    { key:'3rd', value:'3' },
    { key:'4th', value:'4' },
  ];
  @ViewChild('allSelected') allSelected: MatOption | any;
  @ViewChild('sizeNgForm') sizeNgForm: any;

  constructor(
    private matDialogRef:MatDialogRef<AddEditSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _sizeService: ClassService,
    private _toastr: ToastrService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions

  ){}

  ngOnInit(){
    this.init();
    if (this.data[0].result) {
      this.setSizeData();
    }
  }

  init(): void {
    this.sizeForm = this.fb.group({
      subject_name: [null, Validators.required],
      class: [null, Validators.required],
      section: [null, Validators.required],
      feature_img: [null, Validators.required]
    });
  }

  get f() {
    return this.sizeForm.controls;
  }

  tosslePerOne(all: any): any {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.sizeForm.controls.section.value.length == this.sectionList.length)
      this.allSelected.select();
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.sizeForm.controls.section.patchValue([...this.sectionList.map((item: any) => item.value), 0]);
    } else {
      this.sizeForm.controls.section.patchValue([]);
    }
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
        this._sizeService.uploadCoupon(fileObj).subscribe(
          (result: any) => {
            if (result && result.IsSuccess) {
              this.selectedItemImg = result.Data.path;
              this.isUpload = true;
              const itemImageFormControl = this.sizeForm.get('feature_img');
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
    const itemFillImageFormControl = this.sizeForm.get('feature_img');
    itemFillImageFormControl.setValue(null);
    this.selectedItemImg = null;
  }

  imageOnError(event: any) {
    event.target.src = this.constants.defaultImage;
  }

  setSizeData() {
    this.sizeForm.get('size_name').setValue(this.data[0].result.size_name);
    this.sizeForm.get('description').setValue(this.data[0].result.description);
    // this.sizeForm.get('status').setValue(this.data[0].result.status);
  }

  onSubmitAction(): void {
    let sectionArray = this.sizeForm.value.section.filter((i:any) => i != 0);
    console.log(sectionArray);

    this.isBtnLoading = true;
    if (!this.sizeForm.valid) {
      this._toastr.clear();
      this._toastr.error("Please enter valid data.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }

    const sizeDataObj: any = {
      sizeid: this.data[0].result ? this.data[0].result?.id : "",
      size_name: this.sizeForm.value.size_name,
      description: this.sizeForm.value.description,
      // status: this.sizeForm.value.status
    };
    this.sizeForm.disable();
    this._sizeService.addEditSize(sizeDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this._toastr.clear();
        this._toastr.success(result.Message, 'Success');
        this.isBtnLoading = false;
        this.matDialogRef.close();
      } else {
        this.sizeForm.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.sizeForm.enable();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

  closeDailog(){
    this.matDialogRef.close()
  }
}
