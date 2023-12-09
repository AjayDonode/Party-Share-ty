import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
import { StatusBarPlugin } from '@capacitor/status-bar';
import { UserService } from './services/user.service';
import { Route, Router } from '@angular/router';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform, private authService:AuthService, private userService:UserService
    ,private router:Router){
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      if(this.authService.getCurrentUser()!= null) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
  
}
