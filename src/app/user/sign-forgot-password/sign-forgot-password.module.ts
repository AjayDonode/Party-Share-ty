import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignForgotPasswordPageRoutingModule } from './sign-forgot-password-routing.module';

import { SignForgotPasswordPage } from './sign-forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignForgotPasswordPageRoutingModule
  ],
  declarations: [SignForgotPasswordPage]
})
export class SignForgotPasswordPageModule {}
