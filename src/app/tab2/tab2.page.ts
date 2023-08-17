import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { PartyEvent } from '../VO/party-event';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedEvent:any = null;
  partyImages: any[] = [];
  constructor(private eventService:EventService,public photoService:PhotoService) {}

  async ngOnInit() {
    // await this.photoService.loadSaved();
    this.selectedEvent = this.eventService.getSelectedEvent();
    this.photoService.getAllImages().subscribe(res => {
      this.partyImages = res;
    });
  }

}
