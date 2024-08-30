import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create-timetable',
  templateUrl: './student-create-timetable.component.html',
  styleUrl: './student-create-timetable.component.scss'
})
export class StudentCreateTimetableComponent implements OnInit{
  isBtnLoading: boolean = false;
  createTimetable:any = FormGroup;
  student_timetable: any;
  classList:any = [
    { key:'1st', value:'1' },
    { key:'2nd', value:'2' },
    { key:'3rd', value:'3' },
    { key:'4th', value:'4' }, 
    { key:'5th', value:'5' }, 
  ];

  @ViewChild('allSelected') allSelected: MatOption | any;
  constructor(private _router:Router, 
    private _fb:FormBuilder,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  nextStepTimetable(event:any){
    event.stopPropagation();
    console.log(this.createTimetable.value);
    localStorage.setItem('studentTimeTable',JSON.stringify(this.createTimetable.value));
    this._router.navigate(['/timetable/studentdata/studentnexttimetable']);
  }

  initForm(){
    this.createTimetable = this._fb.group({
      studentTimetable: this._fb.array([this.addMoreRows()])
    });
    this.student_timetable = this.createTimetable.controls['studentTimetable']as FormArray;
  }

  get studentTTDetails(){
    return this.createTimetable.controls['studentTimetable']as FormArray;
  }

  addMoreRows(){
    return this._fb.group({
      starttime: ['',Validators.required],
      endtime: ['',Validators.required],
      selectBreak: [false],
      class: ['',Validators.required]
    });
  }

  addTimetable(){
    this.student_timetable.push(this.addMoreRows());
  }

  tosslePerOne(all: any,i:any): any {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.createTimetable.get('studentTimetable').controls[i].get('class').value.length == this.classList.length)
      this.allSelected.select();
  }
  toggleAllSelection(i:any) {
    debugger
    if (this.allSelected.selected) {
      this.createTimetable.get('studentTimetable').controls[i].get('class').patchValue([...this.classList.map((item: any) => item.value), 0]);
    } else {
      this.createTimetable.get('studentTimetable').controls[i].get('class').patchValue([]);
    }
  }

  removeTimetable(index:any){
    if(index >= 1){
      this.student_timetable.removeAt(index,1);
    }
  }
}
