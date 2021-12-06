import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    const authData = JSON.parse(localStorage.getItem('authData')!);
    if (authData) {
      if (authData.token) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getToken() {
    const authData = JSON.parse(localStorage.getItem('authData')!);
    if (authData) {
      if (authData.token) {
        return authData.token;
      } else {
        return null;
      }
    } else {
      return null;
    }

  }

  getLoggedInUserId() {
    const authData = JSON.parse(localStorage.getItem('authData')!);
    if (authData) {
      if (authData.userId) {
        return authData.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}