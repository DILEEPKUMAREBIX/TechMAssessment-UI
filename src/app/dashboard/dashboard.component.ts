import { Component } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
    profiles: any = [];
    constructor(public service:ProfileService, public router:Router) {

    }

    ngOnInit() {
        this.service.getAllProfiles().subscribe(
            (data) => {
                this.profiles = data;
            },
            (error)=> {

            }
        )
    }

    editUser(profile) {
        this.service.editProfile = profile;
        this.router.navigate(['/', 'profile']);
    }
}
