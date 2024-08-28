import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalFunctions } from '../../common/global-function';
import { environment } from '../../../environments/environment';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient, private _globalFunctions: GlobalFunctions) { }

  //Get All Products
  getSize(data: any): any {
    return this.http.post(environment.appURL + 'admin/size', data, this._globalFunctions.getAuthorizationHeader());
  }

  addEditSize(data: any): any {
    return this.http.post(environment.appURL + 'admin/size/save', data, this._globalFunctions.getAuthorizationHeader());
  }

  changeStaus(data: any){
    return this.http.post(environment.appURL + 'admin/size/change', data, this._globalFunctions.getAuthorizationHeader());
  }

  uploadCoupon(data:any){
    return this.http.post(environment.appURL + 'admin/coupon/upload' , data , this._globalFunctions.getFileAuthorizationHeader());
  }
}
