import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-fee-invoice',
  templateUrl: './add-edit-fee-invoice.component.html',
  styleUrl: './add-edit-fee-invoice.component.scss'
})
export class AddEditFeeInvoiceComponent {
  sectionList:any = [
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
  yearList:any = [
    { key:'2023 - 2024', value:'2023 - 2024' },
    { key:'2022 - 2023', value:'2022 - 2023' },
    { key:'2021 - 2022', value:'2021 - 2022' },
    { key:'2020 - 2021', value:'2020 - 2021' },
  ]; 
  genderList:any = [
    { key:'Male', value:'male' },
    { key:'Female', value:'female' },
    { key:'Other', value:'other' },
  ];
  bloodGroupList:any = [
    { key:'A+', value:'1' }, 
    { key:'B+', value:'2' }, 
    { key:'O+', value:'3' },  
    { key:'A-', value:'4' }, 
    { key:'B-', value:'5' }, 
    { key:'O-', value:'6' },  
  ];
  religionList:any = [
    { key:'Hindu', value:'hindu' },
    { key:'Muslim', value:'muslim' },
    { key:'Christian', value:'christian' },
    { key:'Jain', value:'jain' },
    { key:'Sikh', value:'sikh' },
    { key:'Buddhist ', value:'buddhist ' },
  ];

}
