import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public authService:AuthService,public router:Router) { }

  ngOnInit() {
  }

  signUp(email: any, password: any) {
    this.authService.SignUp(email.value, password.value)
      .then((res) => {
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

}
