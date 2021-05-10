import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Profil, User } from 'app/auth/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfilService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  /**
   * Get all users
   */
  getAll() {
    return this._http.get<User[]>(`${environment.apiUrl}/users`);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  updateProfil(id : string ,profil: Profil) : Promise<Profil> {
    var fd = new FormData();
    return new Promise((resolve, reject) => {
      
      this._http.put(`${environment.apiDistant}/api/profil/${id}`,
      {
        "firstName" : profil.firstName,
         "lastName" : profil.lastName,
         "user": {
           "id" : profil.user.id,
           "username" : profil.user.username,
           "email" : profil.user.email
         },
         "address" : {
          "id" : profil.address.id,
          "city" : profil.address.city,
          "codePostal" : profil.address.codePostal,
          "country" : profil.address.country,
          "street" : profil.address.street
         }
      })
      .subscribe((response: any) => {
        var data = response;
        resolve(data);
      }, reject);
    });
  }

  deleteUser(id : String) :  Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.delete(`${environment.apiDistant}/api/user/${id}`).subscribe((response: any) => {
        var data = "ok";
        resolve(data);
      }, reject);
    });
  }
  

  getProfil(id : String) :  Promise<Profil> {
    return new Promise((resolve, reject) => {
      this._http.get(`${environment.apiDistant}/api/profil/${id}`).subscribe((response: any) => {
        var data = response;
        resolve(data);
      }, reject);
    });
  }
   
}
  
