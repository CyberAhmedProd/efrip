import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Image, Profil, User } from 'app/auth/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  /**
   * Get all users
   */
  getAll() {
    return this._http.get<Image[]>(`${environment.apiUrl}/image`);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<Image>(`${environment.apiUrl}/image/${id}`);
  }

  addImage(image : Image){
    var fd = new FormData();
    fd.append('image', image.image);
    fd.append('title',image.title);
    return this._http.post<any>(`${environment.apiDistant}/api/photos/add`, fd).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    
  }
  updateImage(image : Image){
    var fd = new FormData();
    fd.append('image', image.image);
    fd.append('title',image.title);
    return this._http.put<any>(`${environment.apiDistant}/api/photos/${image.id}`, fd).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    
  }
}
  
