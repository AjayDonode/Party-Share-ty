import { Component, NgModule } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { ModalController } from '@ionic/angular';
import { SlideShowComponent } from '../component/slide-show/slide-show.component';
import { GalleryPhoto } from '@capacitor/camera';

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
  selectedSegment:string="all";
  selectedEvent:any;
  partyImages: PartyImage[] = [];
  public savedPhotos:GalleryPhoto[]= [];
  constructor(private eventService:EventService,
    public photoService:PhotoService, 
    private modalController:ModalController) {}

  async ngOnInit() {
    // await this.photoService.loadSaved();
    this.selectedEvent = this.eventService.getSelectedEvent();
    this.photoService.getAllImagesByEvent(this.selectedEvent.id).subscribe(res => {
      this.partyImages = res;
    });
  }

  async openGalleryImages(image:PartyImage, index:Number){
    const modal = await this.modalController.create({
      component:SlideShowComponent,
      componentProps:{
        images:this.partyImages,
        selectedImage:image,
        imageIndex:index
      },
    });
    await modal.present();
  }

  async loadImages(){
    this.photoService.loadSaved().then(response=> {
     //this.savedPhotos = response;
     console.log("Uploaded Data  "+response);
     for (let i = 0; i < response.length; i++) {
      console.log("Uploaded file "+i);
    //   this.photoService.uploadFileToFileStore(this.savedPhotos[i]).then(output=> {
    //   console.log("Uploaded file "+i);
    // })
    }
   });
   }

   onSegmentChange(event:any){
     this.selectedSegment = event.detail.value;
   }

   deleteItem(item: PartyImage) {
    this.photoService.deleteImage(item).then(()=>{
      //this.getPartyEvents();
    });
  }
   

}
