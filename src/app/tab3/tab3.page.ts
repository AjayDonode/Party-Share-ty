import { Component, NgModule } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { ModalController } from '@ionic/angular';
import { SlideShowComponent } from '../component/slide-show/slide-show.component';
import { GalleryPhoto } from '@capacitor/camera';
import { UserService } from '../services/user.service';

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
  currentUserId:any;
  public savedPhotos:GalleryPhoto[]= [];
  constructor(private eventService:EventService, private userService:UserService,
    public photoService:PhotoService, 
    private modalController:ModalController) {}

  async ngOnInit() {
    // await this.photoService.loadSaved();
    this.currentUserId  = this.userService.getCurrentUser().uid;
    this.selectedEvent = this.eventService.getSelectedEvent();
    this.photoService.getAllImagesByEvent(this.selectedEvent.id).subscribe(res => {
      this.partyImages = res;
    });
  }

  async openGalleryImages(image:PartyImage, index:Number){
    console.log("Image "+ image.imageUrl+" Index"+index);
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
    this.savedPhotos = [];
   this.photoService.loadSaved().then(response=> {
    this.savedPhotos = response;
    if(this.savedPhotos.length >0){
    this.upoadImages(this.savedPhotos)
   }
  });
  }

  upoadImages(savedPhotos:GalleryPhoto[]){
    for (let i = 0; i < savedPhotos.length; i++) {
      console.log("Started File"+i);
      this.photoService.uploadFileToFileStore(savedPhotos[i]).then(output=> {
      console.log("Completed File"+i);
    });
    
    }
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
