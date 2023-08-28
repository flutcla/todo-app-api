import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private httpd: HttpClient) { }

  BASE_URI = 'http://localhost:9000'

  signup(data: UserSignup) {
    return this.httpd.post(`${this.BASE_URI}/user/signup`, data, {withCredentials: true});
  }

  logout() {
    return this.httpd.post(`${this.BASE_URI}/user/logout`, {}, {withCredentials: true});
  }

  login(data: UserLogin) {
    return this.httpd.post(`${this.BASE_URI}/user/login`, data, {withCredentials: true});
  }
}

export interface User {
  name:     string,
  email:    string,
}

export interface UserSignup extends User {
  password: string
}

export interface UserLogin {
  email:    string,
  password: string
}