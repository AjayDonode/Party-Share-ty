import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  eventList: any[] = [];
  currentUser:any = null;
  constructor(public router:Router, public eventService:EventService,public userService:UserService) { }

  ngOnInit() {
    this.loadAllEvents();
  }

  addEvent(){
    this.router.navigate(['/add-event']);
  }

  loadAllEvents(){
    // if(this.currentUserId !== null) {
      this.currentUser = this.userService.getCurrentUser();
      console.log("Current user is "+this.currentUser.displayName);
      console.log("Current user is "+this.currentUser.email);
      this.eventService.getAllPartyEvents().subscribe(res => {
        this.eventList = res;
      });
    // }
  }

  openMain(event:any){
    console.log(event);
    this.eventService.setSelectedEvent(event);
    this.router.navigate(['/home']);
  }
  
  logOut(){
  this.userService.logOut();
  this.router.navigate([''])
  }

  showProfile(){
    this.router.navigate(['/profile'])
  }
 
}
