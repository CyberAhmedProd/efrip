import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from 'app/auth/models';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class AccountSettingsService implements Resolve<any> {
  _currentUser : User
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
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiDistant}/api/profil/${this._currentUser.id}`).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
