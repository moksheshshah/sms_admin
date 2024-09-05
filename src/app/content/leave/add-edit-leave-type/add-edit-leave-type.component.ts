import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../../class/class.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-leave-type',
  templateUrl: './add-edit-leave-type.component.html',
  styleUrl: './add-edit-leave-type.component.scss'
})
export class AddEditLeaveTypeComponent {

  isBtnLoading:boolean = false;
  leaveTypeForm: any = FormGroup;
  @ViewChild('allSelected') allSelected: MatOption | any;
  @ViewChild('sizeNgForm') sizeNgForm: any;

  constructor(
    private matDialogRef:MatDialogRef<AddEditLeaveTypeComponent>,
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
    this.leaveTypeForm = this.fb.group({
      type_name: [null, Validators.required],
    });
  }

  get f() {
    return this.leaveTypeForm.controls;
  }

  setSizeData() {
    this.leaveTypeForm.get('type_name').setValue(this.data[0].result.type_name);
  }

  onSubmitAction(): void {
    this.isBtnLoading = true;
    if (!this.leaveTypeForm.valid) {
      this._toastr.clear();
      this._toastr.error("Please enter valid data.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }
    const sizeDataObj: any = {
      sizeid: this.data[0].result ? this.data[0].result?.id : "",
      type_name: this.leaveTypeForm.value.type_name,
    };
    this.leaveTypeForm.disable();
    this._sizeService.addEditSize(sizeDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this._toastr.clear();
        this._toastr.success(result.Message, 'Success');
        this.isBtnLoading = false;
        this.matDialogRef.close();
      } else {
        this.leaveTypeForm.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.leaveTypeForm.enable();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

  closeDailog(){
    this.matDialogRef.close()
  }

}
