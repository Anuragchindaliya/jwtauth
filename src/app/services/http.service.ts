import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _registerUrl = "http://localhost:8000/api/user/register";
  private _loginUrl = "http://localhost:8000/api/user/login";

  constructor(private _http: HttpClient) { }
  registerUser(user: any) {
    return this._http.post<any>(this._registerUrl, user)
  }
  loginUser(user: any) {
    return this._http.post<any>(this._loginUrl, user)
  }
}
