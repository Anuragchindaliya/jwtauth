import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = "http://localhost:8000";
  private _registerUrl = `${this.baseurl}/api/user/register`;
  private _loginUrl = `${this.baseurl}/api/user/login`;
  private _checkAuthUrl = `${this.baseurl}/api/user/checkauth`;

  constructor(private _http: HttpClient, private _cookieService: CookieService) { }
  registerUser(user: any) {
    return this._http.post<any>(this._registerUrl, user)
  }
  loginUser(user: any) {
    return this._http.post<any>(this._loginUrl, user)
  }

  checkUserAuth() {
    const token = this._cookieService.get("token");
    const tokenHeader = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this._http.get(this._checkAuthUrl, { headers: tokenHeader })
  }
  logoutUser() {
    return this._http.get("http://localhost:8000/api/user/logout")
  }
}
