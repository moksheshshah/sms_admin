import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SmDashboardService } from './sm-dashboard.service';
import { GlobalFunctions } from '../../common/global-function';
import { Chart } from 'chart.js';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import moment from 'moment';
import { CONSTANTS } from '../../common/constants';
import $ from 'jquery';
import { DateAdapter } from '@angular/material/core';

export interface userPreview {
  fullname: string;
  email: string;
  mobile: string;
  gender:string;
}

@Component({
  selector: 'app-sm-dashboard',
  templateUrl: './sm-dashboard.component.html',
  styleUrl: './sm-dashboard.component.scss'
})
export class SmDashboardComponent implements OnInit, AfterViewInit {

  isTableLoading: boolean = false;
  countData: any = [];
  userData: any = [];
  userReportData: any = []
  userSubscriptionReportData: any = []
  newUserData: any = [];
  newUserSubscriptionData: any = [];
  userDataMonthNameArr: any;
  userSubscribtionDataMonthNameArr: any;
  userDataContext!: CanvasRenderingContext2D;
  @ViewChild('userChartData') userChartData!: ElementRef;
  @ViewChild('orderChartData') orderChartData!: ElementRef;
  @ViewChild('userCountChartData') userCountChartData!: ElementRef;
  newTotalOrderData: any = [];
  newPendingOrderData: any = [];
  newDeliveredOrderData: any = [];
  newPlanOrderData:any = [];
  orderDataContext!: CanvasRenderingContext2D;
  newUserCountData: any = [];
  selCurrecyType:any ="all";
  isCountLoading:boolean = false;
  isOrderChartLoading:boolean = false;

  private userChart!: Chart;
  private orderChart!: Chart;


  USER_PRE_DATA: userPreview[] = [];
  totalUserPriData: any;
  searchUserPri: any = "";
  displayedColumns: string[] = ['fullname','email', 'mobile', 'gender'];
  userPriData = new MatTableDataSource<userPreview>(this.USER_PRE_DATA);
  selection = new SelectionModel<userPreview>(true, []);
  name: string = "";
  @ViewChild(MatSort, { static: false }) userPriSort!: MatSort;
  constants: any = CONSTANTS;
  currentMonthDays: any;

  // chart variable
  userReportStartDate: any;
  userReportEndDate: any;
  orderReportStartDate: any;
  orderReportEndDate: any;

  selected: any;
  OrderReportSelected: any;
  alwaysShowCalendars!: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  constructor(
    private _dashboardService: SmDashboardService,
    private _globalFunction: GlobalFunctions,
    private _router: Router) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit(): void {
    $('#userChartData').empty();
    this.currentMonthDays = this.getDaysInCurrentMonth();
    this.getCountData();
    //this.getUserData();
    this.getOrderData();
    this.getuserPreviewData();
    this.userPriData.sort = this.userPriSort;
  }

  ngAfterViewInit() {
    this.userPriData.sort = this.userPriSort;
   // this.getUserReportChart();
  }

  filterData(){
    this.getCountData();
    this.getOrderData();
  }

  getDaysInCurrentMonth() {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
  }

  getuserPreviewData(event: any = ''): void {
    this.isTableLoading = true;
    const page = event ? (event.page + 1) : 1;
    let filter = {
      page: '1',
      limit: '5',
      search: ''
    };

    this._dashboardService.getUserPreview(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.USER_PRE_DATA = result.Data.docs;
        this.userPriData = new MatTableDataSource<userPreview>(this.USER_PRE_DATA);
        this.isTableLoading = false;
        this.userPriData.sort = this.userPriSort;
      } else {
        this._globalFunction.successErrorHandling(result, this, true);
        this.isTableLoading = false;
      }
    }, (error: any) => {
      this._globalFunction.errorHanding(error, this, true);
      this.isTableLoading = false;
    });
  }

  // getUserReportChart(): void {
  //   $('#userChartData').empty();
  //   if (this.userChart) {
  //     this.userChart.destroy();
  //   }
  //   this.userDataContext = this.userChartData.nativeElement.getContext('2d');

  //   var firstGradient = this.userDataContext.createLinearGradient(0, 0, 0, 800);
  //   firstGradient.addColorStop(0, 'rgb(255,255,255,0)');
  //   firstGradient.addColorStop(1, 'rgb(255,255,255,0)');

  //   var secondGradient = this.userDataContext.createLinearGradient(0, 0, 0, 800);
  //   secondGradient.addColorStop(0, 'rgb(255,255,255,0)');
  //   secondGradient.addColorStop(1, 'rgb(255,255,255,0)');

  //   if (this.newUserData.length > 0 || this.newUserSubscriptionData.length > 0) {
  //     this.userChart = new Chart(this.userDataContext, {
  //       type: 'line',
  //       data: {
  //         datasets: [
  //           {
  //             label: 'Total User',
  //             backgroundColor: firstGradient,
  //             borderColor: '#3E6227',  // orange line chart
  //             pointRadius: 1,
  //             fill: false,
  //             // tension: 0.7,
  //             data: this.newUserData,
  //           },
  //           {
  //             label: 'Subscription Users',
  //             backgroundColor: secondGradient,
  //             borderColor: '#5388D8', // green line chart
  //             pointRadius: 1,
  //             fill: false,
  //             // tension: 0.7,
  //             data: this.newUserSubscriptionData,
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         interaction: {
  //           mode: 'index',
  //           intersect: false
  //         },
  //         animations: {
  //           radius: {
  //             duration: 400,
  //             easing: 'linear',
  //             loop: (context) => context.active
  //           }
  //         },
  //         plugins: {
  //           title: {
  //             display: true,
  //             text: 'User Reports',

  //           },
  //           tooltip: {
  //             enabled: true,
  //             position: 'nearest',
  //             //external: externalTooltipHandler
  //           }
  //         },
  //         scales: {
  //           y: {
  //             type: 'linear',
  //             display: true,
  //             // grid line settings
  //             grid: {
  //               drawOnChartArea: false, // only want the grid lines for one axis to show up
  //             },
  //             ticks: {

  //               callback(tickValue: any, index, ticks) {
  //                 return Math.round(tickValue);
  //               },

  //             }
  //           },
  //         }
  //       },

  //     });
  //   }

  // }

  getOrderReportChart(): void {
    $('#orderChartData').empty();
    if (this.orderChart) {
      this.orderChart.destroy();
    }
    this.orderDataContext = this.orderChartData.nativeElement.getContext('2d');
    var firstGradient = this.orderDataContext.createLinearGradient(0, 0, 0, 800);
    firstGradient.addColorStop(0, 'rgb(255,255,255,0)');
    firstGradient.addColorStop(1, 'rgb(255,255,255,0)');

    var secondGradient = this.orderDataContext.createLinearGradient(0, 0, 0, 800);
    secondGradient.addColorStop(0, 'rgb(255,255,255,0)');
    secondGradient.addColorStop(1, 'rgb(255,255,255,0)');

    var thirdGradient = this.orderDataContext.createLinearGradient(0, 0, 0, 800);
    thirdGradient.addColorStop(0, 'rgb(255,255,255,0)');
    thirdGradient.addColorStop(1, 'rgb(255,255,255,0)');

    var fourthGradient = this.orderDataContext.createLinearGradient(0, 0, 0, 800);
    fourthGradient.addColorStop(0, 'rgb(255,255,255,0)');
    fourthGradient.addColorStop(1, 'rgb(255,255,255,0)');

    if(this.newTotalOrderData.length > 0 || this.newPendingOrderData.length > 0 || this.newDeliveredOrderData.length > 0 || this.newPlanOrderData.length > 0){
      this.orderChart = new Chart(this.orderDataContext, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Total Orders',
              backgroundColor: firstGradient,
              borderColor: '#ff0000',  // red line chart
              pointRadius: 1,
              fill: false,
              // tension: 0.7,
              data: this.newTotalOrderData,
            },
            {
              label: 'Pending Orders',
              backgroundColor: secondGradient,
              borderColor: '#5388D8', // green line chart
              pointRadius: 1,
              fill: false,
              // tension: 0.7,
              data: this.newPendingOrderData,
            },
            {
              label: 'Delivered Orders',
              backgroundColor: thirdGradient,
              borderColor: '#E69138', // orange line chart
              pointRadius: 1,
              fill: false,
              // tension: 0.7,
              data: this.newDeliveredOrderData,
            },
            {
              label: 'Subscription Plans Orders',
              backgroundColor: fourthGradient,
              borderColor: '#3E6227', // orange line chart
              pointRadius: 1,
              fill: false,
              // tension: 0.7,
              data: this.newPlanOrderData,
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          animations: {
            radius: {
              duration: 400,
              easing: 'linear',
              loop: (context) => context.active
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Order Reports',

            },
            tooltip: {
              enabled: true,
              position: 'nearest',
              displayColors: true, /* if true, color boxes are shown in the tooltip */


              //external: externalTooltipHandler
            }
          },
          scales: {
            // xAxes: {
            //   type: 'linear',
            //   display: true,
            //   position: 'bottom',
            //   ticks: {
            //     callback(tickValue: any, index, ticks) {
            //       tickValue = moment().month(parseInt(tickValue) - 1).format('MMMM')
            //       return tickValue;
            //     },

            //   }
            //   // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            // },
            y: {
              type: 'linear',
              display: true,
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              ticks: {
                callback(tickValue: any, index: any, ticks: any) {
                  return Math.round(tickValue);
                }
              } as any,
            },
          }
        },

      });
    }

  }

  // onUserReportDateChanges(event: any) {
  //   $('#userChartData').empty();
  //   // this.userReportStartDate = new Date(event?.startDate?.$d.setHours(0, 0, 0, 0)).getTime();
  //   this.userReportStartDate = moment(new Date(event?.startDate?.$d.setHours(0, 0, 0, 0)).getTime()).format('DD-MM-yyyy');
  //   this.userReportEndDate = moment(new Date(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).setDate(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).getDate() - 1)).getTime()).format('DD-MM-yyyy');
  //   // console.log(this.userReportStartDate);
  //   this.getUserData();
  // }

  onOrderReportDateChange(event: any) {
    $('#orderChartData').empty();
    this.orderReportStartDate = moment(new Date(event?.startDate?.$d.setHours(0, 0, 0, 0)).getTime()).format('DD-MM-yyyy');
    this.orderReportEndDate = moment(new Date(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).setDate(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).getDate() - 1)).getTime()).format('DD-MM-yyyy');
    this.getOrderData();
  }

  getUserCountReportChart(): void {
    this.userDataContext = this.userCountChartData.nativeElement.getContext('2d');
    // var firstGradient = this.userDataContext.createLinearGradient(0, 0, 0, 800);
    // firstGradient.addColorStop(0, 'rgb(255,255,255,0)');
    // firstGradient.addColorStop(1, 'rgb(255,255,255,0)');

    // var secondGradient = this.userDataContext.createLinearGradient(0, 0, 0, 800);
    // secondGradient.addColorStop(0, 'rgb(255,255,255,0)');
    // secondGradient.addColorStop(1, 'rgb(255,255,255,0)');
    let totalUserCount = new Chart(this.userDataContext, {

      type: 'pie',
      data: {
        datasets: [
          {
            data: this.newUserCountData,
            backgroundColor: [
              'rgba(80,180,50,1.00)',
              'rgba(54, 162, 235, 1)',
            ]
          }
        ],
        labels: ['Active Users :', 'InActive Users : '],
      }
    });
  }

  getCountData() {
    this.isCountLoading = true;
    let obj = {
      curr_type : this.selCurrecyType
    }
    this._dashboardService.getCount(obj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.isCountLoading = false;
        this.countData = result.Data;
        
        this.newUserCountData = [this.countData?.activeUsers, this.countData?.inactiveUsers];
        this.getUserCountReportChart();
      } else {
        this.isCountLoading = false;
        this._globalFunction.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isCountLoading = false;
      this._globalFunction.errorHanding(error, this, true);
    });
  }
  
  // getUserData() {
    //   this.newUserData = [];
    //   this.newUserSubscriptionData = [];
    //   let param = {
      //     startDate: this.userReportStartDate || '',
      //     endDate: this.userReportEndDate || ''
      //   }
      //   this._dashboardService.getUsersReport(param).subscribe((result: any) => {
        //     if (result && result.IsSuccess) {
          //       result.Data.userReports.map((items: any) => {
            //         this.newUserData.push({
              //           x: items.date,
              //           y: parseInt(items.count)
              //         })
              //       })
  //       // console.log(this.newUserData);
  //       result.Data.subscriptionReports.map((items: any) => {
  //         this.newUserSubscriptionData.push({
  //           x: items.date,
  //           y: parseInt(items.count)
  //         })
  //       })
  
  //       this.getUserReportChart();
  //     } else {
  //       this._globalFunction.successErrorHandling(result, this, true)
  //     }
  //   }, (error: any) => {
  //     this._globalFunction.errorHanding(error, this, true);
  //   });
  // }
  
  getOrderData() {
    this.isOrderChartLoading = true;
    this.newTotalOrderData = [];
    this.newPendingOrderData = [];
    this.newDeliveredOrderData = [];
    this.newPlanOrderData = [];
    let param = {
      startDate: this.orderReportStartDate == 'Invalid date' ? '' : this.orderReportStartDate || '',
      endDate: this.orderReportEndDate == 'Invalid date' ? '' : this.orderReportEndDate || '',
      curr_type : this.selCurrecyType
    }

    this._dashboardService.getOrderReport(param).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.isOrderChartLoading = false;
        result.Data.totalordersReports.map((items: any) => {
          this.newTotalOrderData.push({
            x: items.date,
            y: parseInt(items.count)
          })
        })
        result.Data.pendingOrderReports.map((items: any) => {
          this.newPendingOrderData.push({
            x: items.date,
            y: parseInt(items.count)
          })
        })
        
        result.Data.deliveredOrderReports.map((items: any) => {
          this.newDeliveredOrderData.push({
            x: items.date,
            y: parseInt(items.count)
          })
        })
        
        result.Data.subscriptionOrderReports.map((items: any) => {
          this.newPlanOrderData.push({
            x: items.date,
            y: parseInt(items.count)
          })
        })
        
        this.getOrderReportChart();
      } else {
        this.isOrderChartLoading = false;
        this._globalFunction.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isOrderChartLoading = false;
      this._globalFunction.errorHanding(error, this, true);
    });
  }
}

