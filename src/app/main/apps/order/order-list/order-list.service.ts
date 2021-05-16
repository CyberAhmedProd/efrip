import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Category, Order } from 'app/auth/models';

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
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
 

  deleteCategory(id){
    return this._httpClient.delete(`${environment.apiDistant}/api/category/`+id,{
        
    }).subscribe(data => {
      console.log(data);
    })
  }
  editCategory(category: Category){
    return this._httpClient.put<MyData>(`${environment.apiDistant}/api/category/`+category.id,{
      name: category.name
    })
  }
}
