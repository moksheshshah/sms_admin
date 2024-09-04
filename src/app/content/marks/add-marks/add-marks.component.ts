import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrl: './add-marks.component.scss'
})
export class AddMarksComponent implements OnInit{

  marksForm:any = FormGroup;
  subjectMark_detail: any;
  isBtnLoading: boolean = false;
  subjectList:any = [
    { key:'Enaglish', value:'english' }, 
    { key:'Hindi', value:'hindi' }, 
    { key:'Gujarati', value:'gujarati' }, 
    { key:'Science', value:'science' }, 
  ]
  constructor(private matDailodRef:MatDialogRef<AddMarksComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
    this.setFormData(this.subjectList);
  }

  initForm(){
    this.marksForm = this._fb.group({
      total: [''],
      percentage: [''],
      subjectMarkForm: this._fb.array([])
    });
    this.subjectMark_detail = this.marksForm.controls['subjectMarkForm']as FormArray;
    this.addMoreRows();
  }

  get subjectMarkGroup(){
    return this.marksForm.controls['subjectMarkForm']as FormArray;
  }

  addMoreRows(){
    for (let index = 0; index < this.subjectList.length; index++) {
      this.subjectMark_detail.push(this.createMraksFeild());
    }
  }

  createMraksFeild(obj:any = {}){
    return this._fb.group({
      subject_name: [''],
      total_mark: ['100'],
      obtained_mark: [''],
      grade: [''],
    })
  }

  setFormData(list:any){
    for (let index = 0; index < this.subjectList.length; index++) {
      // this.subjectMark_detail.push(this.createMraksFeild());
      this.marksForm.get('subjectMarkForm').controls[index].get('subject_name').setValue(list[index].key)
    }
  }

  onSubmitAction(){
    // console.log(this.marksForm.value);
    this.matDailodRef.close(this.marksForm.value);
    
  }

  closeDailog(){
    this.matDailodRef.close();
  }
}
