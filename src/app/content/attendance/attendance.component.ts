import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTS } from '../../common/constants';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  selectedTab: any;
  isDataLoad: boolean = false;
selClass: any;
classList: any;
sectionList: any;

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.selectedTab = tabChangeEvent.index
    localStorage.setItem('tabIndex', this.selectedTab)
    this.isDataLoad = !this.isDataLoad
  }

}
