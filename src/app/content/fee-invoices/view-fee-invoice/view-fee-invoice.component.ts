import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-fee-invoice',
  templateUrl: './view-fee-invoice.component.html',
  styleUrl: './view-fee-invoice.component.scss'
})
export class ViewFeeInvoiceComponent implements OnInit{

  constructor(private matDialogRef:MatDialogRef<ViewFeeInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit(): void {
    
  }

  closeDailog(){
    this.matDialogRef.close();
  }
}
