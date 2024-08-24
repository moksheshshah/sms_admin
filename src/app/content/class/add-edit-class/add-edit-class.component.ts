import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../class.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-class',
  templateUrl: './add-edit-class.component.html',
  styleUrl: './add-edit-class.component.scss'
})
export class AddEditClassComponent {
  isBtnLoading:boolean = false;
  sizeForm: any = FormGroup;
  isBtnChange:boolean = false;
  sectionList:any = [
    { key:'A', value:'A' }, 
    { key:'B', value:'B' }, 
    { key:'C', value:'C' }, 
    { key:'D', value:'D' }, 
    { key:'E', value:'E' }, 
  ];
  @ViewChild('allSelected') allSelected: MatOption | any;
  @ViewChild('sizeNgForm') sizeNgForm: any;

  constructor(
    private matDialogRef:MatDialogRef<AddEditClassComponent>,
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
      class_name: [null, Validators.required],
      section: [null, Validators.required],
      // status: [true, Validators.required]
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
