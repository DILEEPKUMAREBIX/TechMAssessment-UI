import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProfileService {
    url: string = 'http://localhost:8080';
    editProfile: any = {};
    constructor(private http: HttpClient) { }


    saveProfile(profile) {
        return this.http.post(this.url + '/api/user', profile);
    }

    getAllProfiles() {
        return this.http.get(this.url + '/api/users');
    }

    // saveProfile(user, profileImage: File) {
    //     const formData: FormData = new FormData();

    //     formData.append('profileImage', profileImage);
    //     formData.append('user', JSON.stringify(user));
    //     return this.http.post(
    //         this.url + "/api/fileuser",
    //         formData,
    //         {responseType: 'text'});
    //     // return this.http.post<any>(this.url + "/api/fileuser", formData, {responseType: 'text'});

    // }

    updateProfile(user, profileImage: File) {
        const formData: FormData = new FormData();

        formData.append('profileImage', profileImage);
        formData.append('user', JSON.stringify(user));
        return this.http.put(
            this.url + "/api/user",
            formData,
            { responseType: 'text' });
    }
}
