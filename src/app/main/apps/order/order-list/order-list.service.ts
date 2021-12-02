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
  //Delete the order from the database & add to history
  deleteOrder(id){
    return this._httpClient.delete(`${environment.apiDistant}/api/order/`+id,{        
    })
    //test phase need to revove this in production mode
    .subscribe(data => {console.log(data);
    })
  }
  // Add order to the shipping status & add the trasaction to the history
  onShipping(order: Order){
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/order/shipping/${order.id}`,order).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
  // Add order in status on hold & prepare to go in shipping & add status to history
  onHold(order: Order){
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/order/hold/${order.id}`,order).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
  // add order in status on delevered status & client checked the delevery & add ths status to the history
  onDelivered(order: Order){
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/order/delivered/${order.id}`,order).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
}
