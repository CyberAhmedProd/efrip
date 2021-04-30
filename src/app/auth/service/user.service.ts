import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Profil, User } from 'app/auth/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
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

  getProfil(id : String) :  Promise<Profil> {
    return new Promise((resolve, reject) => {
      this._http.get(`${environment.apiDistant}/api/profil/${id}`).subscribe((response: any) => {
        var data = response;
        resolve(data);
      }, reject);
    });
  }
   
  }
  
