import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from 'app/auth/models/product';


import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
interface MyData {
  success : number ;
  message : string;
}
@Injectable()
export class ProductListService implements Resolve<any> {
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
      this._httpClient.get(`${environment.apiDistant}/api/product`).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows.reverse());
      }, reject);
    });
  }
  /**
   * Add Product
   * @params(
   * product Product)
   */
  addProduct(product) {
    return this._httpClient.post<MyData>(`${environment.apiDistant}/api/product/add`,
    {
      name:product.name,
      user:product.user,
      category:product.category,
      details:product.details,
      quantity:product.quantity,
      price:product.price,
      description:product.description,
      featured:product.featured,
      images:product.images
    });
  }

  deleteProduct(id){
    return this._httpClient.delete(`${environment.apiDistant}/api/product/delete/`+id,{
        
    }).subscribe(data => {
      console.log(data);
    })
  }
  editProduct(product: Product){
    return this._httpClient.put<MyData>(`${environment.apiDistant}/api/product/update/`+product.id,{
      name: product.name
    })
  }
}
