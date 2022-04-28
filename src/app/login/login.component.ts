import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  submitted = false
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    alert("success");
  }
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    //validation on when component initialize
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })

  }

}
