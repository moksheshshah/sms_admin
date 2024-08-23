import { Component, OnInit ,OnChanges, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogInComponent } from '../auth/log-in/log-in.component';
import isOnline from 'is-online';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit ,OnChanges,DoCheck{
  networkStatus: any;
  networkStatus$: Subscription = Subscription.EMPTY;
  isSchool:boolean = false;
  isSchoolManagement:boolean = false;
  isExam:boolean = false;
  isFees:boolean = false;
  isCommunication:boolean = false;
  isAdministrative:boolean = false;
  isReports:boolean = false;
  isAdmin:boolean = false;
  isSetting:boolean = false;
  isShow:boolean = true;
  isAccounting:boolean = false;
productCouponForm: any;

  constructor(private router: Router,
    private toastr:ToastrService
  ) {
    router.events.subscribe((val: any) => {
      if ((!localStorage.getItem("accessToken") || localStorage.getItem("accessToken") == null)) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  ngOnInit(): void {    
    this.checkNetworkStatus();
    if(window.innerWidth > 1024){      
      this.isShow = true;
    } else {
      this.isShow = false;      
    }
  }

  ngOnChanges(){
    this.checkRoutesPath()
  }

  ngDoCheck(): void {
    this.checkRoutesPath();
  }
  
  checkRoutesPath(){
    // setTimeout(() => {
    //   if(window.location.hash.search('#/reports') != -1){
    //     this.isAccounting = true;
    //   } else {
    //     this.isAccounting = false;
    //   }
    // }, 300);
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  async checkNetworkStatus() {
    this.networkStatus = await isOnline();
    //this.networkStatus = navigator.onLine;
    // this.networkStatus$ = merge(
    //   of(null),
    //   fromEvent(window, 'online'),
    //   fromEvent(window, 'offline')
    // )
    // .pipe(map(() => navigator.onLine))
    // .subscribe(status => {
    //   this.networkStatus = status;
    // });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.clear();
    this.router.navigate(['login']);
    this.toastr.success('Logged Out Successfully!', 'Success');
  }
}
