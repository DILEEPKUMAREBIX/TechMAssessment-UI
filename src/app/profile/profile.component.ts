import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

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
  alertType: string;
  showMessage: boolean = false;
  isUpdateAction: boolean = false;
  isFormCreated: boolean = false;
  userData:any;
  supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];

  @ViewChild('myInput')
  myInputVariable: any;

  constructor(public fb: FormBuilder, public service: ProfileService, public router: Router, public loginService: LoginService) {
    if (!this.service.isSubmitAction) {
      this.setForm(this.service.loggedInProfile);
      this.isFormCreated = true;
      this.buttonText = 'Update';
      this.isUpdateAction = true;
    }
    else {
      this.createForm();
      this.isFormCreated = true;
      this.buttonText = 'Submit';
      this.isUpdateAction = false;
    }
  }
  get f1() { return this.profileForm.controls; }


  ngOnInit() {
    if (this.isUpdateAction)
      this.getProfile();
    else
      this.createForm();
  }

  getProfile() {
    this.service.getProfileById(this.service.loggedInProfile['id']).subscribe(
      (data) => {
        this.userData = data;
        this.setForm(data);
      },
      (error) => {
        this.setMessage('Error while loading profile', 'danger');
      }
    );
  }

  createForm() {
    this.profileForm = this.fb.group({
      id: [this.service.loggedInProfile.id],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  setForm(profile) {
    this.profileForm = this.fb.group({
      id: [profile.id],
      firstName: [profile.firstName, Validators.required],
      lastName: [profile.lastName, Validators.required],
      dob: [profile.dob, Validators.required],
      gender: [profile.gender, Validators.required],
      address: [profile.address, Validators.required]
    });
  }

  submitProfile() {
    console.log(this.profileForm.value);
    this.service.trim(this.profileForm);
    this.service.saveProfile(this.profileForm.value).subscribe(
      (data) => {
        this.profileForm.reset();
        this.service.isSubmitAction = false;
        this.router.navigate(['/', 'dashboard']);
      },
      (error) => {
        alert('Error in creation');
      }
    )
  }
  fileName = '';
  setImage(files: FileList) {
    this.fileName = '';
    this.newProfileImage = null;
    let file = files.item(0);
    if (file && file.type) {
      if (0 > this.supportedFormats.indexOf(file.type)) {
        this.myInputVariable.nativeElement.value = "";
        this.setMessage("Unsupported format trying to add. Supported formats are : .pdf, .jpg, .jpeg, .png", 'danger');
      }
      else if (file.size >= 1048576) {
        this.myInputVariable.nativeElement.value = "";
        this.setMessage("Maximum supported size is 1MB", 'danger');
      }
      else {
        this.newProfileImage = file;
        this.fileName = file.name;
      }
    }
  }

  validate() {
    if (!this.profileForm.get('firstName').valid) {
      this.setMessage("First Name is Mandotary", 'danger');
      return false;
    }
    else if (!this.profileForm.get('lastName').valid) {
      this.setMessage("Last Name is Mandotary", 'danger');
      return false;
    }
    else if (!this.profileForm.get('dob').valid) {
      this.setMessage("Date Of Birth is Mandotary", 'danger');
      return false;
    }
    else if (!this.profileForm.get('gender').valid) {
      this.setMessage("Gender is Mandotary", 'danger');
      return false;
    }
    else if (!this.profileForm.get('address').valid) {
      this.setMessage("Address is Mandotary", 'danger');
      return false;
    }
    return true;
  }

  submitProfilewithFile() {
    this.clearMessage();
    this.service.trim(this.profileForm);
    if (!this.validate()) {
      return false;
    }
    if (this.buttonText == 'Update') {
      if (this.newProfileImage) {
        this.service.updateProfile(this.profileForm.value, this.newProfileImage).subscribe(
          (res: any) => {
            this.service.loggedInProfile = this.profileForm.value;
            this.profileForm.reset();
            this.router.navigate(['/', 'dashboard']);
          },
          err => {
            alert("Error Adding the user: " + err.message);
          }
        );
      }
      else {
        this.setMessage('Uploading necessary document is mandotary to update the user profile', 'danger');
      }
    }
    else {
      this.service.saveProfile(this.profileForm.value).subscribe(
        res => {
          this.profileForm.reset();
          this.service.isSubmitAction = false;
          this.service.loggedInProfile = res;
          this.router.navigate(['/', 'dashboard']);
        },
        err => {
          alert("Error Adding the user: " + err.message);
        }
      );
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

  onCancel() {
    this.router.navigate(['/', 'dashboard']);
  }

  onReset() {
    this.setForm(this.userData);
  }

  onClear() {
    Object.keys(this.profileForm.controls).forEach(key => {
      this.profileForm.get(key).setValue('');
    });
  }
}