import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin: boolean = true;
  message: string = '';
  showMessage: boolean = false;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  alertType: string;

  constructor(public service: LoginService, public router: Router, public fb: FormBuilder, public profileService: ProfileService) {
    this.createForm()
  }

  ngOnInit() {
    this.profileService.loggedInProfile = {};
    this.profileService.isSubmitAction = false;
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
      // password: ['Dil@763362', [Validators.required]],
      // confirm: ['Dil@763362', [Validators.required]]
    }
    );
  }


  login() {
    this.profileService.trim(this.loginForm);
    this.clearMessage();
    this.service.validate(this.loginForm.value).subscribe(
      (data: any) => {
        this.profileService.loggedInProfile = data;
        this.getUser(data.id);
      },
      (error) => {
        this.setMessage(error['error']['message'], 'danger');
        this.loginForm.reset();
      });
  }

  getUser(id) {
    this.service.getUser(id).subscribe(
      (data) => {
        this.profileService.loggedInProfile = data;
        this.router.navigate(['/', 'dashboard']);
      },
      (error) => {
        this.profileService.isSubmitAction = true;
        this.router.navigate(['/', 'profile']);
      });
  }

  validate() {
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.signUpForm.value.email))) {
      this.setMessage("Please enter valid email address", 'danger');
      return false;
    }
    else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.signUpForm.value.password))) {
      this.setMessage("Password should be atleast 8 characters long and should contain one number,one capital character and one special character", 'danger');
      return false;
    }
    else if (this.signUpForm.value.password != this.signUpForm.value.confirm) {
      this.setMessage("Passwords don't match", 'danger');
      return false;
    }
    return true;
  }

  saveLogin() {
    this.profileService.trim(this.signUpForm);
    this.clearMessage();
    if (this.validate()) {
      this.service.saveUser(this.signUpForm.value).subscribe(
        (data) => {
          // alert('success');
          this.createForm();
          this.isLogin = true;
          this.setMessage('You have registered successfully', 'success');
        },
        (error) => {
          // alert('error');
          this.setMessage(error.error.message, 'danger');
        }
      )
    }

  }

  swithclogin(value) {
    this.clearMessage();
    if (value === 'register') {
      this.createSignUpForm();
      this.isLogin = false;
    }
    else {
      this.createForm();
      this.isLogin = true;
    }
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.alertType = type;
    this.showMessage = true;
  }

  clearMessage() {
    this.message = '';
    this.showMessage = false;
  }

  get f() {
    if (this.signUpForm && this.signUpForm.controls)
      return this.signUpForm.controls;
  }


}
