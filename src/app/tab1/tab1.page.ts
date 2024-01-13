import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import * as firebase from 'firebase/compat';
import { Console } from 'console';
import { GalleryPhoto } from '@capacitor/camera';
import { EventService } from '../services/event.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public savedPhotos:GalleryPhoto[]= [{
    "webPath": "http://localhost:8100/f80b6f00-387a-48ba-9759-c2a71e5c45d5",
    "format": "jpeg"
},{
  "webPath": "blob:http://localhost:8100/8e10afc6-ad10-4800-82a6-4f8a6612540d",
  "format": "jpeg"
}];
  constructor(public photoService:PhotoService, public eventService:EventService, private localStore:LocalStorageService) {
    
  }
  
  async ngOnInit() {
     await this.localStore.getData("ImageGallery").then(response=>{ console.log(response)});
  }
  //const storageRef = firebase.storage().ref();
  async loadImages(){
   
    this.photoService.loadSaved().then(response=> {
      this.savedPhotos = response;
   // this.savedPhotos.concat(selectedPhotos);
    // for (let i = 0; i < this.savedPhotos.length; i++) {
    //   console.log("Started File"+i);
    //  // this.photoService.uploadFileToFileStore(savedPhotos[i]).then(output=> {
    //   console.log(this.savedPhotos[i]);
    // };
  });
  }

  upoadImages(savedPhotos:GalleryPhoto[]){
    this.localStore.storeData("ImageGallery/"+123, savedPhotos).then(response=>{ console.log(response)});
  }

}
