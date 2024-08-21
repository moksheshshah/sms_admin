import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from './../../common/global-function';
import { environment } from '../../../environments/environment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }

  getCount(data:any = {}){
    return this.http.post(environment.appURL + 'admin/dashboard/counts',data , this._globalFunctions.getAuthorizationHeader())
  }

  getOrderReport(data:any){
    return this.http.post(environment.appURL + 'admin/dashboard/orderreports',data , this._globalFunctions.getAuthorizationHeader())
  }

  // getUsersReport(data:any){
  //   return this.http.post(environment.appURL + 'admin/dashboard/userreports',data , this._globalFunctions.getAuthorizationHeader())
  // }

  getUserPreview(data:any){
    return this.http.post(environment.appURL + 'admin/users' , data , this._globalFunctions.getAuthorizationHeader())
  }

}
