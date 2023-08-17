import { Component, NgModule } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { ModalController } from '@ionic/angular';
import { SlideShowComponent } from '../component/slide-show/slide-show.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: true
  };
  
  private selectedEvent:any;
  partyImages: PartyImage[] = [];
  constructor(private eventService:EventService,
    public photoService:PhotoService, 
    private modalController:ModalController) {}

  async ngOnInit() {
    // await this.photoService.loadSaved();
    this.selectedEvent = this.eventService.getSelectedEvent();
    this.photoService.getAllImages().subscribe(res => {
      this.partyImages = res;
    });
  }

  async openGalleryImages(image:PartyImage){
    const modal = await this.modalController.create({
      component:SlideShowComponent,
      componentProps:{
        images:this.partyImages,
        selectedImage:image,
      },
    });
    await modal.present();
  }

}
