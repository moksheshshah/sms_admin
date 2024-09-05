import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent {

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
