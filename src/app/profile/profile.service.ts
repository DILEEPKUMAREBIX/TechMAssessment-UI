import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ProfileService {
    url: string = 'http://localhost:8080';
    loggedInProfile: any = {};
    isSubmitAction: any = false;
    constructor(private http: HttpClient) { }
    months: any = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    createChart(el, cfg) {
        Highcharts.chart(el, cfg);
    }


    saveProfile(profile) {
        return this.http.post(this.url + '/api/user', profile);
    }

    getProfileById(id) {
        return this.http.get(this.url + '/api/user/' +id);
    }

    getAllProfiles() {
        return this.http.get(this.url + '/api/users');
    }

    public getFile(path: string): Observable<any> {
        return this.http.get(path, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }), responseType: 'blob'
        }).pipe(

        );
    }

    findMonthWiseReport() {
        return this.http.get(this.url + '/api/trends');
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

    trim(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
          //console.log(form.get(key).value.length);
          form.get(key).setValue(form.get(key).value.toString().trim());
          //console.log(form.get(key).value.length);
        });
      }
}
