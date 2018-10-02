import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppserviceService } from '../app/services/appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  signIn_Form: FormGroup;
  signIn_Submitted: boolean = false;

  signUp_Form: FormGroup;
  signUp_Submitted: boolean = false;

  password_match: boolean = false;
  pass: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppserviceService,
  ) { }

  ngOnInit() {
    this.signIn_Form = this.formBuilder.group({
      signin_email: ['', [Validators.required, Validators.email]],
      signin_password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.signUp_Form = this.formBuilder.group({
      signup_email: ['', [Validators.email, Validators.required]],
      signup_password: ['', [Validators.required, Validators.minLength(8)]],
      signup_confirm_password: ['', Validators.required],
    })
  }

  get signIn() { return this.signIn_Form.controls; }
  get signUp() { return this.signUp_Form.controls; }
  checkPasswordMatch(val_1, val_2) {
    if (val_1 === val_2) {
      return true;
    } else {
      return false;
    }
  }
  onEventFired(val) {
    this.password_match = this.checkPasswordMatch(this.signUp_Form.value.signup_password, val);
  }

  signInFunction() {
    this.signIn_Submitted = true;

    // stop here if form is invalid
    if (this.signIn_Form.invalid) {
      return;
    } else {
      this.appService.signIn_request({
        'email': this.signIn_Form.value.signin_email,
        'password': this.signIn_Form.value.signin_password
      }).subscribe(
        (data: any) => {
          console.log('Sign In Response', data);
        },
        (error) => {
          console.log('SIGN IN ERROR:', error)
        })
    }
  }
  signUpFunction() {
    this.signUp_Submitted = true;
    this.password_match = this.checkPasswordMatch(this.signUp_Form.value.signup_password, this.signUp_Form.value.signup_confirm_password);
    if (this.signUp_Form.invalid) {
      return;
    } else if (!this.password_match) {
      return;
    } else {
      this.appService.signUp_request({
        'email': this.signUp_Form.value.signup_email,
        'password': this.signUp_Form.value.signup_confirm_password,
      }).subscribe(
        (data: any) => {
          console.log('Sign Up Response', data);

        },
        (error) => {
          console.log('SIGN UP ERROR:', error)
        }
      );
    }
  }
}
