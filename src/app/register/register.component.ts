import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  submitted = false;
  onSubmit() {
    this.submitted = true;
    console.log("submit click");
  }
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      // confirm_password: ["", [Validators.required, Validators.minLength(6)]]
    }
    )
  }

}
