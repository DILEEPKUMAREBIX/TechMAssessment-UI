import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm: FormGroup;
  newProfileImage: any;
  buttonText: string = 'Submit';
  message: string = '';
  showMessage: boolean = false;
  isUpdateAction: boolean = false;

  constructor(public fb: FormBuilder, public service: ProfileService, public router: Router, public loginService: LoginService) {
    if (this.service.editProfile['id'] != null && this.service.editProfile['id'] != undefined) {
      this.setForm(this.service.editProfile);
      this.buttonText = 'Update';
      this.isUpdateAction = true;
    }
    else {
      this.createForm();
      this.buttonText = 'Submit';
      this.isUpdateAction = false;
    }

  }

  createForm() {
    this.profileForm = this.fb.group({
      id: [this.loginService.loggedInUser.id],
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: [''],
      address: ['']
    });
  }

  setForm(profile) {
    this.profileForm = this.fb.group({
      id: [profile.id],
      firstName: [profile.firstName],
      lastName: [profile.lastName],
      phone: [profile.phone],
      email: [profile.email],
      address: [profile.address]
    });
  }

  submitProfile() {
    console.log(this.profileForm.value);
    this.service.saveProfile(this.profileForm.value).subscribe(
      (data) => {
        alert('created successfully');
        this.profileForm.reset();
        this.router.navigate(['/', 'dashboard']);
      },
      (error) => {
        alert('Error in creation');
      }
    )
  }

  setImage(files: FileList) {
    this.newProfileImage = files.item(0);
  }

  submitProfilewithFile() {
    this.clearMessage();

    if (this.buttonText == 'Update') {
      if (this.newProfileImage) {
        this.service.updateProfile(this.profileForm.value, this.newProfileImage).subscribe(
          res => {
            this.profileForm.reset();
            this.router.navigate(['/', 'dashboard']);
          },
          err => {
            alert("Error Adding the user: " + err.message);
          }
        );
      }
      else {
        this.setMessage('Uploading necessary document is mandotary to update the user profile');
      }
    }
    else {
      this.service.saveProfile(this.profileForm.value).subscribe(
        res => {
          this.profileForm.reset();
          this.router.navigate(['/', 'dashboard']);
        },
        err => {
          alert("Error Adding the user: " + err.message);
        }
      );
    }
  }

  setMessage(message: string) {
    this.message = message;
    this.showMessage = true;
  }

  clearMessage() {
    this.message = '';
    this.showMessage = false;
  }
}
