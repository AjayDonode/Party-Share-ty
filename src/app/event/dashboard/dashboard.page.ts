import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, MenuController, ModalController } from '@ionic/angular';
import { PartyEvent } from 'src/app/VO/party-event';
import { EventService } from 'src/app/services/event.service';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';
import { GrantAccessModalPage } from './modal/grant-access-modal/grant-access-modal.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  eventList: any[] = [];
  sharedEvents: any[] = [];
  currentUser:any = null;
  constructor(public router:Router, public eventService:EventService,public userService:UserService, private modalController: ModalController) { 
   
  }

  ngOnInit() {
    console.log("init")
    this.loadAllEvents();
    this.loadSharedEvents();
  }

  canReuse() {
    return true;
  }
  addEvent(){
    this.router.navigate(['/add-event']);
  }

  joinEvent(){
    this.router.navigate(['/join-event']);
  }

  updateEvent(eventObj:PartyEvent){
    this.router.navigate(['/add-event'],{ state: { event: eventObj } });
  }

  async grantEvent(eventObj:PartyEvent){
    const modal = await this.modalController.create({
      component: GrantAccessModalPage, 
      componentProps: {
        data: eventObj.id
      }
    });
    await modal.present();
  }

  removeEvent(eventObj:PartyEvent){
    console.log(eventObj);
    this.eventService.deletePartyEvent(eventObj);
  }

  loadAllEvents(){
      this.currentUser = this.userService.getCurrentUser();
      console.log("current user is "+this.currentUser.uid)
      if(this.currentUser === null ||  this.currentUser === undefined)
        this.router.navigate(['/home'])
      else{
      this.eventService.getPartyEventByHost(this.currentUser.uid).subscribe(res => {
        this.eventList = res;
      });
     }
  }

  loadSharedEvents(){
    this.currentUser = this.userService.getCurrentUser();
    console.log("current user is "+this.currentUser.email)
    if(this.currentUser === null ||  this.currentUser === undefined)
      this.router.navigate(['/home'])
    else{
    this.eventService.getSharedPartyEventByUserId(this.currentUser.uid).subscribe((res: any) => {
      console.log(res)
      this.sharedEvents = res;
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

