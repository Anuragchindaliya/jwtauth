import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  submitted = false;
  errorMsg = "";
  constructor(private formBuilder: FormBuilder, private router: Router, private _auth: HttpService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    }
    )
  }

  onSubmit() {
    this.submitted = true;
    this._auth.registerUser(this.registerForm.value).subscribe((res) => {
      this.errorMsg = ""
      if (res.status === "success") {
        this.registerForm.reset();
        this.router.navigate(["profile"])
      } else {
        console.log(res.message)
        this.errorMsg = res.message;
      }
    })
  }
}
