import { Component, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnDestroy {
  selectedTab: any;
  isDataLoad: boolean = false;

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.selectedTab = tabChangeEvent.index
    localStorage.setItem('tabIndex', this.selectedTab)
    this.isDataLoad = !this.isDataLoad
  }

  ngOnDestroy(): void {
    // localStorage.removeItem('studentTimeTable');
  }
}
