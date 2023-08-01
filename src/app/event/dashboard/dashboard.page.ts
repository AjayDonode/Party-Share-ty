import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  eventList: any[] = [];
  constructor(public router:Router, public eventService:EventService) { }

  ngOnInit() {
    this.loadAllEvents();
  }

  addEvent(){
    this.router.navigate(['/add-event']);
  }

  loadAllEvents(){
    // if(this.currentUserId !== null) {
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
 
}
