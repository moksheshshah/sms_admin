import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolsService } from '../../schools/schools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';

@Component({
  selector: 'app-view-leave-details',
  templateUrl: './view-leave-details.component.html',
  styleUrl: './view-leave-details.component.scss'
})
export class ViewLeaveDetailsComponent implements OnInit{
  productCouponForm:any = FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _couponService: SchoolsService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    // private dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.prepareAddEditExpenseForm();
  }

  prepareAddEditExpenseForm() {
    this.productCouponForm = this._formBuilder.group({
      description:['',Validators.required],
    });
  }
}
