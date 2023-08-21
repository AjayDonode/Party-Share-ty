import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { PartyEvent } from 'src/app/VO/party-event';
import { EventService } from 'src/app/services/event.service';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';
import { isNullOrUndefined } from 'util';

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

  updateEvent(eventObj:PartyEvent){
    console.log(eventObj);
    this.router.navigate(['/add-event'],{ state: { event: eventObj } });
  }

  removeEvent(eventObj:PartyEvent){
    console.log(eventObj);
    this.eventService.deletePartyEvent(eventObj);
  }

  loadAllEvents(){
      this.currentUser = this.userService.getCurrentUser();
      if(this.currentUser === null ||  this.currentUser === undefined)
        this.router.navigate(['/home'])
      else{
      this.eventService.getPartyEventByHost(this.currentUser.uid).subscribe(res => {
        this.eventList = res;
      });
     }
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
