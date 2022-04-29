import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: HttpService, private _cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this._auth.logoutUser().subscribe((res: any) => {
      if (res.status === "success") {
        this._cookie.delete("token")
        this.router.navigate(["/login"]);
      }
    })
  }
}
