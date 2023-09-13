import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorhandelingService } from 'src/app/services/errorhandeling.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm!: FormGroup<any>;
  loginError!: string;
  submitted:Boolean = false;
  
  constructor(public authService: AuthService, private errorHandlingService: ErrorhandelingService,
    public router: Router, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }
  
  logIn() {
    this.submitted = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password
    this.authService
      .SignIn(email, password)
      .then((): any => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['dashboard']);
        } else {
         // this.loginError = "Email is not verified";
          return false;
        }
      })
      .catch((error) => {
        this.errorHandlingService.handleFirebaseError(error);
        this.loginError = this.errorHandlingService.handleFirebaseError(error);
        this.submitted = false;
      });
  }
  

}
