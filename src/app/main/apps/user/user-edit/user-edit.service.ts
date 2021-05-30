import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Profil } from 'app/auth/models';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class UserEditService implements Resolve<any> {
  public apiData: any;
  public onDataChanged: BehaviorSubject<any>;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onDataChanged = new BehaviorSubject({});
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
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }
  /**
   * Get API Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.apiDistant+"/api/profil").subscribe((response: any) => {
        this.apiData = response;
        this.onDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  UpdateUser(id : string,profil : Profil): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiDistant}/api/profilad/${id}`).subscribe((response: any) => {
        this.apiData = response;
        this.onDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  updateUserAdd(id : string, profil : Profil): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiDistant}/api/profilad/${id}`,profil).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
}
