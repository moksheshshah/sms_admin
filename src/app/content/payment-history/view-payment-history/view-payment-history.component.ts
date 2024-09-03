import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-payment-history',
  templateUrl: './view-payment-history.component.html',
  styleUrl: './view-payment-history.component.scss'
})
export class ViewPaymentHistoryComponent implements OnInit{

  constructor( private matDialogRef:MatDialogRef<ViewPaymentHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit(): void {
    
  }

}
