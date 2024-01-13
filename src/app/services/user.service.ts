import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private firestore: AngularFirestore, public authServcie : AuthService) { }

  getUserByUid(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  getCurrentUser(){
    return this.authServcie.getCurrentUser();
  }

  logOut(){
    this.authServcie.SignOut();
  }

  updateUserData(user:User){
    this.authServcie.SetUserData(user);
  }

}
