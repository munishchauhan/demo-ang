import { EnvironmentUrlService } from "./environment-url.service";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { User } from "../core/models/user";

const postUrl = environment.apiUrl + "/auth/login";
const forgotUrl = environment.apiUrl + "/account/forgot-password";
const resetUrl = environment.apiUrl + "/account/reset-password";
const changeUrl = environment.apiUrl + "/account/change-password";
const authLocalStorageToken = `${environment.USERDATA_KEY}`;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {
    // this.currentUserSubject = new BehaviorSubject<any>(
    //   JSON.parse(localStorage.getItem(authLocalStorageToken))
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    const data = { username, password };
    return this.http
      .post(postUrl, data, httpOptions)
      .pipe(map(this.setAuth), catchError(this.handleError));
  }

  validate(username: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    const data = { username };
    var url = environment.apiUrl + "/auth/validate";
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  register(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var url = environment.apiUrl + "/auth/register";
    return this.http
      .post(url, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(authLocalStorageToken);
  }

  forgotPassword(username: string): Observable<any> {
    var data = { username: username };
    const url = `${forgotUrl}`;
    return this.http
      .post(url, data)
      .pipe
      // catchError(this.handleError)
      ();
  }

  resetPassword(
    code: string,
    newPassword: string,
    username: string
  ): Observable<any> {
    const data = { code, newPassword, username };
    const url = `${resetUrl}`;
    return this.http.post(url, data);
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  changePassword(newPassword: string, oldPassword: string): Observable<any> {
    const data = { newPassword, oldPassword };
    const _econn_user = JSON.parse(localStorage.getItem("_econn_user"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + _econn_user.token,
      }),
    };

    const url = `${changeUrl}`;
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      console.log(error.error.message);
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  private setAuth(res: any) {
    const body = res;

    if (body.status && body.data.accessToken) {
      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem(authLocalStorageToken, JSON.stringify(body.data));
      //debugger
      //this.currentUserSubject.next(body.data.userDetails);
    }

    return body || {};
  }

  public getCurrentUser() {
    var _econn_user = JSON.parse(localStorage.getItem(authLocalStorageToken));
    if (_econn_user != null) {
      return _econn_user;
    }
  }
}
