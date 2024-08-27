import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrl: './add-edit-teacher.component.scss'
})
export class AddEditTeacherComponent {
isUpload: any;
constants: any;
classList: any;
sectionList: any;
yearList: any;
genderList: any;
bloodGroupList: any;
religionList: any;
removeFillAvatar() {
throw new Error('Method not implemented.');
}
uploadItemImage($event: Event) {
throw new Error('Method not implemented.');
}
isBtnLoading: any;
couponId: any;
productCouponForm:any = FormGroup;
selectedItemImg: any;
onSubmitAction() {
throw new Error('Method not implemented.');
}

}
