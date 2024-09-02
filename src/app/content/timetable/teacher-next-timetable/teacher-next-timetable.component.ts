import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher-next-timetable',
  templateUrl: './teacher-next-timetable.component.html',
  styleUrl: './teacher-next-timetable.component.scss'
})
export class TeacherNextTimetableComponent implements OnDestroy{
  getTimetableData: any;
  daysNameForm: any = FormGroup;
  monday_details: any;
  tuesday_details: any;

  subjectList: any = [
    { key: 'English', value: 'english' },
    { key: 'Gujarati', value: 'gujarati' },
    { key: 'Maths', value: 'maths' },
    { key: 'Hindi', value: 'hindi' },
    { key: 'Science', value: 'science' },
  ];
  teacherList: any = [
    { key: 'Abc', value: 'abc' },
    { key: 'Xyz', value: 'xyz' },
    { key: 'Pqr', value: 'pqr' },
    { key: 'Dfg', value: 'dfg' },
  ];
  wednesday_details: any;
  thursday_details: any;
  friday_details: any;
  saturday_details: any;
  isBtnLoading: boolean = false;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTimetableData = JSON.parse(localStorage.getItem('teacherTimeTable')!);
    let count = 1;
    this.getTimetableData.teacherTimetable.map((i:any)=>{
      if (!i.selectBreak) {
        i.numberToRoman = this.convertToRoman(count++);
      }else{
        i.numberToRoman = 0;
      }
    });
    this.initNewForm();
  }

  convertToRoman(value: number): string {
    if (value < 1 || value > 3999) {
      return 'Invalid input'; // Handle numbers out of range
    }
  
    const romanNumerals: { [key: number]: string } = {
      1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
      100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
      10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'
    };
  
    let result = '';
    let remainingValue = value;
  
    // Loop through the keys of the roman numerals in descending order
    for (const num of Object.keys(romanNumerals).map(Number).sort((a, b) => b - a)) {
      while (remainingValue >= num) {
        result += romanNumerals[num];
        remainingValue -= num;
      }
    }
  
    return result;
  }

  initNewForm(obj: any = {}) {
    this.daysNameForm = this._fb.group({
      mondayForm: this._fb.array([]),
      tuesdayForm: this._fb.array([]),
      wednesdayForm: this._fb.array([]),
      thursdayForm: this._fb.array([]),
      fridayForm: this._fb.array([]),
      saturdayForm: this._fb.array([]),
    });
    this.monday_details = this.daysNameForm.controls['mondayForm'] as FormArray;
    this.tuesday_details = this.daysNameForm.controls['tuesdayForm'] as FormArray;
    this.wednesday_details = this.daysNameForm.controls['wednesdayForm'] as FormArray;
    this.thursday_details = this.daysNameForm.controls['thursdayForm'] as FormArray;
    this.friday_details = this.daysNameForm.controls['fridayForm'] as FormArray;
    this.saturday_details = this.daysNameForm.controls['saturdayForm'] as FormArray;

    // Add initial rows if necessary
    this.addMoreRows(this.getTimetableData.teacherTimetable.length); 
  }

  get mondayGroup() {
    return this.daysNameForm.controls['mondayForm'] as FormArray;
  }
  get tuesdayGroup() {
    return this.daysNameForm.controls['tuesdayForm'] as FormArray;
  }
  get wednesdayGroup() {
    return this.daysNameForm.controls['wednesdayForm'] as FormArray;
  }
  get thursdayGroup() {
    return this.daysNameForm.controls['thursdayForm'] as FormArray;
  }
  get fridayGroup() {
    return this.daysNameForm.controls['fridayForm'] as FormArray;
  }
  get saturdayGroup() {
    return this.daysNameForm.controls['saturdayForm'] as FormArray;
  }
  
  addMoreRows(numberOfRows: any) {
    for (let index = 0; index < numberOfRows; index++) {
      const item = this.getTimetableData.teacherTimetable[index];
      if (item.selectBreak) {
        this.monday_details.push(this._fb.group({subject: ['break'],teacher: ['break']}));
        this.tuesday_details.push(this._fb.group({subject: ['break'],teacher: ['break']}));
        this.wednesday_details.push(this._fb.group({subject: ['break'],teacher: ['break']}));
        this.thursday_details.push(this._fb.group({subject: ['break'],teacher: ['break']}));
        this.friday_details.push(this._fb.group({subject: ['break'],teacher: ['break']}));
        this.saturday_details.push(this._fb.group({subject: ['break'],teacher: ['break']}));
      } else {
        this.monday_details.push(this.createRow());
        this.tuesday_details.push(this.createRow());
        this.wednesday_details.push(this.createRow());
        this.thursday_details.push(this.createRow());
        this.friday_details.push(this.createRow());
        this.saturday_details.push(this.createRow());
      }
    }
  }

  createRow(): FormGroup {
    return this._fb.group({
      subject: [''],
      teacher: ['']
    });
  }

  saveTimetable(){
    console.log("timetable-->",this.daysNameForm.value);
    
  }

  ngOnDestroy(): void {
    localStorage.removeItem('teacherTimetable');
  }
}
