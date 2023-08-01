import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { LoginPage } from './login/login.page';
// import { RegisterPage } from './register/register.page';
const routes: Routes = [
  

  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./user/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./user/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-forgot-password',
    loadChildren: () => import('./user/sign-forgot-password/sign-forgot-password.module').then( m => m.SignForgotPasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./user/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./user/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./event/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./event/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
