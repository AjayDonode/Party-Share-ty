import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, GalleryPhoto } from '@capacitor/camera';
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
  }
  
  public async loadSaved(): Promise<GalleryPhoto[]> {
    await Camera.pickImages({quality: 100}).then(results => {
        this.photos = results.photos;
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
        const partyEventId = JSON.parse(localStorage.getItem('selectedEvent')!).id;
        const blob = await response.blob();
        const filePath = `images/${partyEventId}/${new Date().getTime()}.${photo.format}`; // Replace with your desired file path
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
        return partyImage
        //await this.convertBlobToBase64(blob) as string;
      } catch (e) {
        console.error(e);
        return null;
      }
  }

  //TODO use this function to store encoded images to storage  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public getAllImagesByEvent(selectedEventId: string): Observable<any[]> {
    this.imageCollection = this.firestore.collection<PartyImage>('images', ref => {
      return ref.where('partyeventid', '==', selectedEventId);
    });
    return this.imageCollection.valueChanges();
  }

  public deleteImage(image: PartyImage) {
    return this.imageCollection.doc(image.id).delete();
  }
  
  public setGalleryImageToPartyImage(photo: GalleryPhoto){

  }

}

