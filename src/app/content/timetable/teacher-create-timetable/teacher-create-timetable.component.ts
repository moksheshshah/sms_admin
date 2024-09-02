import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-create-timetable',
  templateUrl: './teacher-create-timetable.component.html',
  styleUrl: './teacher-create-timetable.component.scss'
})
export class TeacherCreateTimetableComponent {
  isBtnLoading: boolean = false;
  createTimetable:any = FormGroup;
  teacher_timetable: any;
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

  nextStepTimetables(event:any){
    event.stopPropagation();
    console.log(this.createTimetable.value);
    localStorage.setItem('teacherTimeTable',JSON.stringify(this.createTimetable.value));
    this._router.navigate(['/timetable/teacherdata/teachernexttimetable']);
  }

  initForm(){
    this.createTimetable = this._fb.group({
      teacherTimetable: this._fb.array([this.addMoreRows()])
    });
    this.teacher_timetable = this.createTimetable.controls['teacherTimetable']as FormArray;
  }

  get teacherTTDetails(){
    return this.createTimetable.controls['teacherTimetable']as FormArray;
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
    this.createTimetable.get('teacherTimetable').controls.forEach((element: any, index: any) => {
      if (this.createTimetable.get('teacherTimetable').invalid) {
        Object.keys(element.controls).forEach((key) => {
          this.createTimetable.get('teacherTimetable').controls[index].controls[key].touched = true;
          this.createTimetable.get('teacherTimetable').controls[index].controls[key].markAsDirty();
        });
        return;
      }
    });
    if (this.teacher_timetable.value.length && this.createTimetable.get('teacherTimetable').valid) {
      this.teacher_timetable.push(this.addMoreRows());
      // this.qualification_details.push(this.addMoreRows());
    }
  }

  tosslePerOne(all: any,i:any): any {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.createTimetable.get('teacherTimetable').controls[i].get('class').value.length == this.classList.length)
      this.allSelected.select();
  }
  toggleAllSelection(i:any) {
    if (this.allSelected.selected) {
      this.createTimetable.get('teacherTimetable').controls[i].get('class').patchValue([...this.classList.map((item: any) => item.value), 0]);
    } else {
      this.createTimetable.get('teacherTimetable').controls[i].get('class').patchValue([]);
    }
  }

  removeTimetable(index:any){
    if(index >= 1){
      this.teacher_timetable.removeAt(index,1);
    }
  }
}
