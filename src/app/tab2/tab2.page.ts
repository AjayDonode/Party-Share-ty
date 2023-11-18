import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Observable, filter } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { PartyEvent } from '../VO/party-event';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedEvent:any = null;
  partyImages: any[] = [];
  currentUserId:any;
  constructor(private eventService:EventService,public photoService:PhotoService, private userService:UserService) {
    this.selectedEvent = this.eventService.getSelectedEvent();
    this.currentUserId  = this.userService.getCurrentUser().uid;
  }

  async ngOnInit() {
    // this.selectedEvent = this.eventService.getSelectedEvent();
     this.getPartyEvents();
  }

  private getPartyEvents() {
    let currentUserId = this.currentUserId;
    console.log("Selected Event is " + this.selectedEvent);
    console.log("Selected User is " + this.currentUserId);
    this.photoService.getAllImagesByEvent(this.selectedEvent.id).subscribe(res => {
      this.partyImages = res;
      this.partyImages.filter(function (item) { return item.createdBy == currentUserId; });
    });
  }

  deleteItem(item: PartyImage) {
    this.photoService.deleteImage(item).then(()=>{
      //this.getPartyEvents();
    });
  }

}
