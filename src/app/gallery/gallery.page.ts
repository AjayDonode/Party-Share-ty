import { Component, NgModule } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhotoService } from '../services/photo.service';
import { PartyImage } from '../VO/party-image';
import { ModalController, Platform } from '@ionic/angular';
import { SlideShowComponent } from '../component/slide-show/slide-show.component';
import { GalleryPhoto } from '@capacitor/camera';
import { UserService } from '../services/user.service';
import { Plugins } from '@capacitor/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Media, MediaAlbum, MediaSaveOptions } from "@capacitor-community/media";
import { User } from '../services/user';
import { EventUserAccessService } from '../services/event-user-access.service';
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
  selectedUser: string = "all";
  selectedEvent:any;
  partyImages: PartyImage[] = [];
  filteredPartyImages: PartyImage[] = [];
  currentUserId:any;
  eventUsers:any;
  public savedPhotos:GalleryPhoto[]= [];
  progress:number = 0;
  isProgressing = false;
  
  constructor(private eventService:EventService, private userService:UserService,
    public photoService:PhotoService, private eventUserService:EventUserAccessService,
    private modalController:ModalController, private platform: Platform) {}

  async ngOnInit() {
    // await this.photoService.loadSaved();
    this.currentUserId  = this.userService.getCurrentUser().uid;
    this.selectedEvent = this.eventService.getSelectedEvent();

    this.photoService.getAllImagesByEvent(this.selectedEvent.id).subscribe(res => {
      this.partyImages = res;
      this.filteredPartyImages = this.partyImages;
    });

    // this.eventUserService.getAccessList(this.selectedEvent.id).subscribe(res=> 
    //   {this.eventUsers = res});
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
  //  this.photoService.selectAndUploadImage();
   this.photoService.loadSaved().then(response=> {
    this.savedPhotos = response;
    if(this.savedPhotos.length > 0){
    this.uploadImages(this.savedPhotos)
   }
  });
  }

  uploadImages(savedPhotos:GalleryPhoto[]){
    this.progress = 0;
    // let userPartyImages: PartyImage[] = [];
    this.isProgressing = true;
    for (let i = 0; i < savedPhotos.length; i++) {
        // let userPartyImage: PartyImage ;
        this.photoService.uploadFileToFileStore(savedPhotos[i]).then(output=> {
        this.progress = ((i + 1) / savedPhotos.length) * 100;
          // userPartyImage.imageUrl = savedPhotos[i].webPath;
          // userPartyImages.push(userPartyImage)
        if(this.progress>=100){ 
          this.isProgressing = false;
          //this.addImagesToAlbum(this.selectedEvent.name,userPartyImages);
        }
    });
    
    }
  }
   onSegmentChange(event:any){
     this.selectedSegment = event.detail.value;
   }

   deleteItem(item: PartyImage, event:any) {
    event.stopPropagation();
    this.photoService.deleteImage(item).then(()=>{
    });
  }

  
  //**Download and saves images to iphone gallery */
  saveToGallery(){
   let isSupported = this.isSupportedPlateform()
   if(isSupported)
    this.addImagesToAlbum(this.selectedEvent.name,this.partyImages);
  else 
    this.downloadImage()
  }

  /**This method syncs images uploaded by other users to phone gallery */
  async addImagesToAlbum(albumName: string, partyImages:PartyImage[]) {
    this.progress = 0;
    this.isProgressing = true;
    let savedAlbum:any = await this.getAlbumByName(albumName)
    for (let i = 0; i < partyImages.length; i++) {
      if(partyImages[i].uploadedBy != this.currentUserId) 
      {
        let opts: MediaSaveOptions = { path: partyImages[i].imageUrl, albumIdentifier: savedAlbum };
        await Media.savePhoto(opts);
      }
      this.progress = ((i + 1) / partyImages.length) * 100;
    };
    this.isProgressing = false;
  }

  //Create album name from PartyEvent ID 
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
   

  getFilteredRecords() {
    if (this.selectedUser === 'all') {
      return this.partyImages;
    } else {
      return this.partyImages.filter(record => record.uploadedBy === this.selectedUser);
    }
  }

isSupportedPlateform():boolean{
  console.log(this.platform)
  if (!this.platform.is('hybrid')) {
    console.error('Album functionality is not available on the web');
    return false;
  } else 
    return true;
}

  selectUser(user:string) {
    this.selectedUser = user;
    this.filteredPartyImages = this.getFilteredRecords();
  }

  //For web we hae to use this method to donload to
  downloadImage() {
    // Create an anchor element and set its attributes for download
    this.progress = 0;
    for (let i = 0; i < this.partyImages.length; i++) {
      console.log(this.partyImages[i].imageUrl);
      let imageid:string = ""+this.partyImages[i].id;
      const anchor = document.createElement('a');
      anchor.setAttribute('href', this.partyImages[i].imageUrl);
      anchor.setAttribute('download', imageid);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      this.progress = ((i + 1) / this.partyImages.length) * 100;
    };
  }

}
