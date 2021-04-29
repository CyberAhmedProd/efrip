import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "environments/environment";
import { User, Role } from "app/auth/models";
import { ToastrService } from "ngx-toastr";
interface MyData {
  message: string;
  success: number;
}
@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return (
      this.currentUser &&
      this.currentUserSubject.value.roles[0].role === "Admin"
    );
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return (
      this.currentUser &&
      this.currentUserSubject.value.roles[0].role === "Client"
    );
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiDistant}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                "You have successfully logged in as an " +
                  user.roles[0].role +
                  " user to Vuexy. Now you can start to explore. Enjoy! 🎉",
                "👋 Welcome, " + user.username+ "!",
                { toastClass: "toast ngx-toastr", closeButton: true }
              );
            }, 5000);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    // notify
    this.currentUserSubject.next(null);
  }

  register(username, email, password) {
    return this._http.post<MyData>(`${environment.apiDistant}/api/auth/register`,
                  {
                    username,
                    email,
                    password,
                    'firstName': null,
                    'lastName': null,
                    'avatar': null,
                    'address': {},
                    'Userstate': 'New',
                    'status': 'pending',
                    'roles': [
                      {
                        'id':'608878bfd02c579ab9cc5204'
                      }
                    ]
                  });
  }
}
