import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-fee-invoice',
  templateUrl: './add-edit-fee-invoice.component.html',
  styleUrl: './add-edit-fee-invoice.component.scss'
})
export class AddEditFeeInvoiceComponent implements OnInit{
  sectionList:any = [
    { key:'Select All', value:'SA' },
    { key:'A', value:'A' }, 
    { key:'B', value:'B' }, 
    { key:'C', value:'C' }, 
    { key:'D', value:'D' }, 
    { key:'E', value:'E' }, 
  ];
  classList:any = [
    { key:'1st', value:'1' }, 
    { key:'2nd', value:'2' }, 
    { key:'3rd', value:'3' }, 
    { key:'4th', value:'4' }, 
    { key:'5th', value:'5' }, 
  ];
  studentList:any = [
    { key:'Select All', value:'SA' },
    { key:'Deselect All', value:'DSA' },
    { key:'John - 01', value:'01' },
    { key:'Abc - 02', value:'02' },
    { key:'Xyz - 03', value:'03' },
    { key:'Pqr - 04', value:'04' },
  ]
  feesInvoiceForm:any = FormGroup;
  editor !: Editor;
  toolbar: Toolbar = [['bold', 'italic'], ['underline', 'strike'], ['code', 'blockquote'], ['ordered_list', 'bullet_list'], [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }], ['link', 'image'], ['text_color', 'background_color'], ['align_left', 'align_center', 'align_right', 'align_justify'],];
  ingredient_length: any = 0;

  constructor(private _formBuilder:FormBuilder, 
    private _toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.editor = new Editor();
    this.initForm();
  }

  initForm() {
    this.feesInvoiceForm = this._formBuilder.group({
      class: ['', [Validators.required]],
      section: ['', [Validators.required]],
      student: ['', [Validators.required]],
      invoice_title: ['', Validators.required],
      description: ['',Validators.required],
      invoice_no: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      issue_date: ['', [Validators.required]],
      due_date: ['', [Validators.required]],

    });
  }

  onSubmitted(){
    console.log(this.feesInvoiceForm.value);
  
  }

  ingredientLength(event: any = '') {
    this.ingredient_length = event.length
    if (event.length > 10000) {
      this._toastr.clear();
      this._toastr.error("You can not write more product description", 'Oops!');
    }
  }
}
