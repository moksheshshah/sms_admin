import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../../class/class.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrl: './add-edit-role.component.scss'
})
export class AddEditRoleComponent {
  isBtnLoading:boolean = false;
  roleForm: any = FormGroup;
  @ViewChild('allSelected') allSelected: MatOption | any;
  @ViewChild('sizeNgForm') sizeNgForm: any;

  constructor(
    private matDialogRef:MatDialogRef<AddEditRoleComponent>,
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
    this.roleForm = this.fb.group({
      role_name: [null, Validators.required],
    });
  }

  get f() {
    return this.roleForm.controls;
  }

  setSizeData() {
    this.roleForm.get('role_name').setValue(this.data[0].result.role_name);
  }

  onSubmitAction(): void {
    this.isBtnLoading = true;
    if (!this.roleForm.valid) {
      this._toastr.clear();
      this._toastr.error("Please enter valid data.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }
    const sizeDataObj: any = {
      sizeid: this.data[0].result ? this.data[0].result?.id : "",
      role_name: this.roleForm.value.role_name,
    };
    this.roleForm.disable();
    this._sizeService.addEditSize(sizeDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this._toastr.clear();
        this._toastr.success(result.Message, 'Success');
        this.isBtnLoading = false;
        this.matDialogRef.close();
      } else {
        this.roleForm.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.roleForm.enable();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

  closeDailog(){
    this.matDialogRef.close()
  }

}
