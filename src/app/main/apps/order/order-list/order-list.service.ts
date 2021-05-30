import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Order } from 'app/auth/models';

import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
interface MyData {
  success : number ;
  message : string;
}
@Injectable()
export class OrderListService implements Resolve<any> {
  rows: any;
  onDatatablessChanged: BehaviorSubject<any>;
  currentUser : any

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onDatatablessChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiDistant}/api/order/getting`).subscribe((response: any) => {
        this.rows = response;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser.roles[0].role == "Client")
        {
          this.rows = this.rows.filter((row) => row.user.id === this.currentUser.id)
        }else{
          this.rows = response;
        }
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
 

  deleteOrder(id){
    return this._httpClient.delete(`${environment.apiDistant}/api/order/`+id,{
        
    }).subscribe(data => {
      console.log(data);
    })
  }
  onShipping(order: Order){
 
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/order/shipping/${order.id}`,order).subscribe((response: any) => {
       
        
        resolve(response);
      }, reject);
    });
  }
  onHold(order: Order){
 
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/order/hold/${order.id}`,order).subscribe((response: any) => {
       
        
        resolve(response);
      }, reject);
    });
  }
  onDelivered(order: Order){
 
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/order/delivered/${order.id}`,order).subscribe((response: any) => {
       
        
        resolve(response);
      }, reject);
    });
  }
  

}
