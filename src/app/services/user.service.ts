import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public authServcie : AuthService) { }

  getCurrentUser(){
    console.log(this.authServcie.getCurrentUser());
  }

  logOut(){
    this.authServcie.SignOut();
  }

}
