import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = "password"
  isText: boolean = false
  eyeIcon: string = "fa fa-eye-slash"
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    localStorage.removeItem('loggedToken')
  }

  hideShowPass(){
    this.isText = !this.isText;

    (this.isText) ? this.type = "text" : this.type = "password";
    (this.isText) ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  }

  onRegister() {
    if (!this.signUpForm.valid){
      this.toast.error({
        detail: "Error",
        summary: "Please input all the required fields.",
        duration: 5000
      })

      ValidateForm.validateAllFormFields(this.signUpForm);
      return;
    }

    // TODO call login API
    console.log(this.signUpForm.value)
  }
}
