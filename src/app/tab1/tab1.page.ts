import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import * as firebase from 'firebase/compat';
import { Console } from 'console';
import { GalleryPhoto } from '@capacitor/camera';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public savedPhotos:GalleryPhoto[]= [];
  constructor(public photoService:PhotoService, public eventService:EventService) {
    
  }
  
  async ngOnInit() {
    // await this.photoService.loadSaved();
    
  }
  //const storageRef = firebase.storage().ref();
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

}
