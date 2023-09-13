import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm!: FormGroup<any>;
  signUpError = undefined;
  submitted:Boolean = false;
  constructor(public authService:AuthService,private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      name:new FormControl('',Validators.required),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }
  

  signUp() {
    this.authService.SignUp(this.registerForm.value.email, this.registerForm.value.password)
      .then((res) => {
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

}
