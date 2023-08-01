import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignForgotPasswordPage } from './sign-forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: SignForgotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignForgotPasswordPageRoutingModule {}
