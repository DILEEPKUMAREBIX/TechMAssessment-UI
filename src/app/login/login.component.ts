import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin: boolean = true;
  message:string = '';
  showMessage:boolean = false;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  alertType: string;

  constructor(public service: LoginService, public router:Router, public fb:FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      username: [''],
      password: [''],
      confirm: ['']
    });
  }


  login() {
    this.clearMessage();
    this.service.validate(this.loginForm.value).subscribe(
      (data: any) => {
        // alert('success');
        this.service.loggedInUser = data;
        this.getUser(data.id);
      },
      (error) => {
        this.setMessage('Invalid Credintials provided','danger');
        this.loginForm.reset();
      });
  }

  getUser(id) {
    this.service.getUser(id).subscribe(
      (data) => {
        // alert('success');
        console.log(data);
        this.router.navigate(['/', 'dashboard']);
      },
      (error) => {
        this.router.navigate(['/', 'profile']);
      });
  }

  saveLogin() {
    this.service.saveUser(this.signUpForm.value).subscribe(
      (data) => {
        // alert('success');
        this.createForm();
        this.isLogin = true;
        this.setMessage('You have registered successfully','success');
      },
      (error)=> {
        // alert('error');
        this.setMessage('Error in registering user','danger');
      }
    )
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
}
