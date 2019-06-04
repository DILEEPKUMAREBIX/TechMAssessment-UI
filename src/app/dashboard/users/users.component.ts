import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/profile.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent {

    profiles: any = [];
    filteredProfiles: any = [];
    filter = new FormControl('');
    page = 1;
    pageSize = 8;

    constructor(public service: ProfileService, public router: Router) {
        this.filter.valueChanges.subscribe(
            text => {
                this.filteredProfiles = this.search(text);
            }
        );
    }

    search(text: string): any[] {
        let results =  this.profiles.filter(profile => {
            const term = text.toLowerCase();
            return profile.firstName.toLowerCase().includes(term)
                || profile.lastName.toLowerCase().includes(term)
                || profile.gender.toLowerCase().includes(term)
                || profile.address.toLowerCase().includes(term);
        });
        if (results && results.length > 0)
            return results;
        else
            return [];
    }

    ngOnInit() {
        this.service.getAllProfiles().subscribe(
            (data) => {
                this.profiles = data;
                this.filteredProfiles = this.profiles;
            },
            (error) => {

            }
        )
    }

    editUser(profile) {
        this.service.loggedInProfile = profile;
        this.router.navigate(['/dashboard/update']);
    }

    get countries(): any[] {
        // console.log(this.filteredProfiles);
        return this.filteredProfiles
            .map((country, i) => ({ id: i + 1, ...country }))
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
}