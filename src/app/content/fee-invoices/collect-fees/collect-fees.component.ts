import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collect-fees',
  templateUrl: './collect-fees.component.html',
  // styleUrl: './collect-fees.component.scss'
})
export class CollectFeesComponent {
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

  constructor(private _formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.initForm()
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
}
