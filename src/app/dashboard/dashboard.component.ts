import { Component } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showDashBoard = true;
  constructor(public router: Router, public profileService: ProfileService) {

  }

  navigate(router: string) {
    this.showDashBoard = false;
    this.router.navigate(['/dashboard', router]);
  }

  navigateToDashBoard() {
    this.showDashBoard = true;
    this.router.navigate(['/dashboard']);
  }
}
