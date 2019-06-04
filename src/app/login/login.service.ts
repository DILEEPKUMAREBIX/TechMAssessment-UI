import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginService {
    url: string = 'http://localhost:8080';
    loggedInUser: any;
    constructor(private http: HttpClient) { }


  validate(user) {
    return this.http.post(this.url + '/api/login', user);
  }

  getUser(id) {
    return this.http.get(this.url + '/api/user/'+ id);
  }

  saveUser(loginUser) {
    return this.http.post(this.url + '/api/register/', loginUser);
  }
}
