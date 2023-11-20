import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, GalleryPhoto } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Observable, finalize } from 'rxjs';
import { PartyImage } from '../VO/party-image';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  downloadURL: Observable<string> | undefined;
  public photos: GalleryPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  //private platform: Platform;
  public imgArray = [];
  private imageCollection!: AngularFirestoreCollection<PartyImage>;

  constructor(private platforme: Platform, private userService: UserService, 
    private firestore: AngularFirestore, private storage: AngularFireStorage) {
      // this.imageCollection = firestore.collection<PartyImage>('images');
  }
  
  public async loadSaved() {
    Camera.pickImages({ quality: 100, height: 210, width: 210, correctOrientation: true, limit: 100 }).then(results => {
      if (results.photos.length > 0) {
        for (let i = 0; i < results.photos.length; i++) {
          this.photos.push(results.photos[i]);
        }
      }
    },
      error => {
        "Failed photos download"
      });
    return this.photos;
  }

  public async uploadFileToFileStore(photo: GalleryPhoto) {
    let partyImage: PartyImage = {
      title: '',
      partyeventid: '',
      uploadedOn: new Date(),
      uploadedBy: this.userService.getCurrentUser().uid,
      imageUrl: ''
    }

    try {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      const filePath = `images/${new Date().getTime()}.${photo.format}`; // Replace with your desired file path
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, blob);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
            partyImage.id = this.firestore.createId();
            partyImage.partyeventid = JSON.parse(localStorage.getItem('selectedEvent')!).id;
            partyImage.imageUrl = url;
            partyImage.uploadedBy = this.userService.getCurrentUser().uid;
            partyImage.uploadedOn = new Date();
            this.firestore.collection('images').doc(partyImage.id).set(partyImage);
          });
        })
      ).subscribe();
      return await this.convertBlobToBase64(blob) as string;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  // public getAllImages(): Observable<any[]> {
  //   return this.firestore.collection('images').valueChanges();
  // }

  public getAllImagesByEvent(selectedEventId: string): Observable<any[]> {
    const uid = this.userService.getCurrentUser().uid;
    this.imageCollection = this.firestore.collection<PartyImage>('images', ref => {
      return ref.where('partyeventid', '==', selectedEventId);
    });
    return this.imageCollection.valueChanges();
  }

  public deleteImage(image: PartyImage) {
    console.log("image.id : "+image.id)
    return this.imageCollection.doc(image.id).delete();
  }


  //**Donwload and dave photos to album  */

  async downloadAndSaveImage(imageUrl: string, fileName: string) {
   //const url = 'https://example.com/images/';
  // const album = 'downloaded_now';
  
  // // Get the list of images from the URL
  // const response = await HTTP.get(imageUrl);
  // const data = JSON.parse(response.data);
  // const images = data.images;
  
  // // Create the album if it doesn't exist
  // const albumExists = await Filesystem.isDirectory({
  //   path: album,
  //   directory: FilesystemDirectory.Pictures,
  // });
  // if (!albumExists) {
  //   await Filesystem.mkdir({
  //     path: album,
  //     directory: FilesystemDirectory.Pictures,
  //     recursive: false,
  //   });
  // }
  
  // // Download each image and save it to the album
  // for (const image of images) {
  //   const imageUrl = url + image;
  //   const response = await HTTP.downloadFile(imageUrl);
  //   const fileName = imageUrl.split('/').pop();
  //   await Filesystem.writeFile({
  //     path: `${album}/${fileName}`,
  //     data: response.data,
  //     directory: FilesystemDirectory.Pictures,
  //     encoding: FilesystemEncoding.UTF8,
  //   });
  // }
  
  console.log('All images downloaded and saved!');
  }

}

