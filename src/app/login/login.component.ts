import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  submitted = false;
  errorMsg = "";
  constructor(private _auth: HttpService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //validation on when component initialize
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })

  }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return
    }
    this._auth.loginUser(this.loginForm.value).subscribe((res) => {
      this.errorMsg = ""
      if (res.status === "success") {
        this.loginForm.reset();
        this.router.navigate(["profile"])
      } else {
        this.errorMsg = res.message;
      }
    });

    alert("success");
  }

}
