import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  ionicForm!: FormGroup<any>;
 
  constructor( private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.ionicForm  = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6)])
      // email: new FormControl(
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      //   ]
      // ),
      // mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
  }


  submitForm = () => {
    if (this.ionicForm.valid) {
      console.log(this.ionicForm.value);
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };

}
