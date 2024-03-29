import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "environments/environment";
import { Image, Profil, User } from "app/auth/models";
import { Observable } from "rxjs";
interface MyData {
  success: number;
  message: string;
}
@Injectable({ providedIn: "root" })
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

  addImage(image: Image) {
    var fd = new FormData();
    fd.append("image", image.image);
    fd.append("title", image.title);
    return this._http
      .post<any>(`${environment.apiDistant}/api/photos/add`, fd)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
  addImage2(image: any) {
    //console.log(image)
    var fd = new FormData();
    fd.append("image", image.file.rawFile);
    fd.append("title", image.file.type);
    return this._http.post<any>(`${environment.apiDistant}/api/photos/add`, fd);
  }
  updateImage(image: Image) {
    var fd = new FormData();
    fd.append("image", image.image);
    fd.append("title", image.title);
    return this._http
      .put<any>(`${environment.apiDistant}/api/photos/${image.id}`, fd)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
  deleteImage(id: String) {
    return this._http.delete<MyData>(
      `${environment.apiDistant}/api/photos/` + id,
      {}
    );
  }
}
