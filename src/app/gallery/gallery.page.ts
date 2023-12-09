import { Component, NgModule } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { ModalController } from '@ionic/angular';
import { SlideShowComponent } from '../component/slide-show/slide-show.component';
import { GalleryPhoto } from '@capacitor/camera';
import { UserService } from '../services/user.service';
import { Plugins } from '@capacitor/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Media, MediaAlbum, MediaSaveOptions } from "@capacitor-community/media";
const { Camera, Photos} = Plugins;

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss']
})
export class GalleryPage {
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
      this.photoService.uploadFileToFileStore(savedPhotos[i]).then(output=> {
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

  
  saveToGallery(){
   let albumName = this.selectedEvent.name; 
    this.checkOrCreateAlbum(albumName);
  }

  async checkOrCreateAlbum(albumName: string) {
    let savedAlbum:any = await this.getAlbumByName(albumName)
    for (let i = 0; i < this.partyImages.length; i++) {
      console.log(this.partyImages[i].imageUrl);
      let opts: MediaSaveOptions = { path: this.partyImages[i].imageUrl, albumIdentifier: savedAlbum };
        await Media.savePhoto(opts);
    };
  }

  async getAlbumByName(albumName: string) {
    const {albums} = await Media.getAlbums();
    let demoAlbum = albums.find(a => a.name === albumName);
    if (demoAlbum === undefined) {
      await Media.createAlbum({ name: albumName });
      const { albums: updatedAlbums } = await Media.getAlbums();
      demoAlbum = updatedAlbums.find(a => a.name === albumName);
    }
    return demoAlbum?.identifier;
  }
   

}
