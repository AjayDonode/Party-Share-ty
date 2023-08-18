import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginError = undefined;
  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }
  
  logIn(email:any, password:any) {
    this.authService
      .SignIn(email.value, password.value)
      .then((): any => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['dashboard']);
        } else {
         // this.loginError = "Email is not verified";
          return false;
        }
      })
      .catch((error) => {
        this.loginError = error.message;
        //window.alert(error.message);
      });
  }
  

}
