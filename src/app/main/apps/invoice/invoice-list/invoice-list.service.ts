import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class InvoiceListService implements Resolve<any> {
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
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiDistant}/api/category`).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  /**
   * Add Category
   * @params(
   * category Category)
   */
  addCategory(category) {
    return this._httpClient.post(`${environment.apiDistant}/api/category`,
    {
      name : category.name
    }).subscribe (data => {
      console.log(data)
    });
  }

  deleteCategory(id){
    return this._httpClient.delete(`${environment.apiDistant}/api/category/`+id,{
        
    }).subscribe(data => {
      console.log(data);
    })
  }
}
