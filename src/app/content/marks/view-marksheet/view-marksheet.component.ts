import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';

@Component({
  selector: 'app-view-marksheet',
  templateUrl: './view-marksheet.component.html',
  styleUrl: './view-marksheet.component.scss'
})
export class ViewMarksheetComponent implements OnInit{

  constructor(private matDailogRef:MatDialogRef<ViewMarksheetComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
  ){}

  ngOnInit(): void {
    
  }

  closeDailog(){
    this.matDailogRef.close();
  }
}
