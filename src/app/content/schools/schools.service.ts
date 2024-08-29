import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalFunctions } from '../../common/global-function';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http:HttpClient, private _globalFunctions:GlobalFunctions) { }

  getProductCouponList(data:any){
    return this.http.post(environment.appURL + 'admin/productcoupon' , data , this._globalFunctions.getAuthorizationHeader());
  }

  getProductCouponById(data:any){
    return this.http.post(environment.appURL + 'admin/productcoupon/getone' , data , this._globalFunctions.getAuthorizationHeader());
  }

  uploadCoupon(data:any){
    return this.http.post(environment.appURL + 'admin/coupon/upload' , data , this._globalFunctions.getFileAuthorizationHeader());
  }

  changeCouponStatus(data:any){
    return this.http.post(environment.appURL + 'admin/productcoupon/change' , data , this._globalFunctions.getAuthorizationHeader());
  }

  saveProductCoupon(data:any){
    return this.http.post(environment.appURL + 'admin/productcoupon/save' , data , this._globalFunctions.getFileAuthorizationHeader());
  }

  getAllVarientList(){
    return this.http.get(environment.appURL + 'admin/product/variants/list', this._globalFunctions.getAuthorizationHeader());
  }
  getImage(data:any ){
    return this.http.post(environment.appURL + 'admin/customerreview/upload', data, this._globalFunctions.getFileAuthorizationHeader());
 }
}
