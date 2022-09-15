import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password"
  isText: boolean = false
  eyeIcon: string = "fa fa-eye-slash"
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private toast: NgToastService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    localStorage.removeItem('loggedToken')
  }

  hideShowPass(){
    this.isText = !this.isText;

    (this.isText) ? this.type = "text" : this.type = "password";
    (this.isText) ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  }

  onLogin() {
    if (!this.loginForm.valid){
      this.toast.error({
        detail: "Error",
        summary: "Please input all the required fields.",
        duration: 5000
      })
      ValidateForm.validateAllFormFields(this.loginForm);
      return;
    }

    // TODO call login API
    if (!(this.loginForm.value.username === 'admin' && this.loginForm.value.password === 'admin')) {
      this.toast.error({
        detail: "Login Failed",
        summary: "Invalid username or password.",
        duration: 5000
      })
      return;
    }

    localStorage.setItem('loggedToken', this.loginForm.value)
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

}
