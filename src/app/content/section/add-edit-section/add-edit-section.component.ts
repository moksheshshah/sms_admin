import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../../class/class.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-section',
  templateUrl: './add-edit-section.component.html',
  styleUrl: './add-edit-section.component.scss'
})
export class AddEditSectionComponent {
  isBtnLoading:boolean = false;
  isBtnChange:boolean = false;
  @ViewChild('allSelected') allSelected: MatOption | any;
  @ViewChild('sizeNgForm') sizeNgForm: any;
  sectionName = '';

  constructor(
    private matDialogRef:MatDialogRef<AddEditSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sizeService: ClassService,
    private _toastr: ToastrService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions

  ){}

  ngOnInit(){
    if (this.data[0].result) {
      this.setSizeData();
    }
  }

  setSizeData() {
    // this.sizeForm.get('size_name').setValue(this.data[0].result.size_name);
    // this.sizeForm.get('description').setValue(this.data[0].result.description);
    // this.sizeForm.get('status').setValue(this.data[0].result.status);
  }

  onSubmitAction(): void {
    console.log(this.sectionName);
    this.isBtnLoading = true;
    if (this.sectionName == '') {
      this._toastr.clear();
      this._toastr.error("Please enter valid data.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }

    const sizeDataObj: any = {
      // sizeid: this.data[0].result ? this.data[0].result?.id : "",
      // size_name: this.sizeForm.value.size_name,
      // description: this.sizeForm.value.description,
      // status: this.sizeForm.value.status
    };
    this._sizeService.addEditSize(sizeDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this._toastr.clear();
        this._toastr.success(result.Message, 'Success');
        this.isBtnLoading = false;
        this.matDialogRef.close();
      } else {
        this.matDialogRef.close();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.matDialogRef.close();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

  closeDailog(){
    this.matDialogRef.close();
  }
}
