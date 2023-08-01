import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
import { Camera, GalleryPhoto } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { strict } from 'assert';
import { Observable, finalize } from 'rxjs';
import { PartyImage } from '../VO/party-image';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  downloadURL: Observable<string> | undefined;
  public photos: GalleryPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;
  public imgArray = [];
  constructor(private platforme: Platform,private firestore:AngularFirestore, private storage: AngularFireStorage) { 
    this.platform = platforme;
  }

  public async loadSaved() {
    Camera.pickImages({quality: 100, height: 210, width: 210, correctOrientation:true, limit: 100 }).then(results => {
        if(results.photos.length > 0) {
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

  public async uploadFileToFileStore(photo:GalleryPhoto){
    let partyImage:PartyImage = {
      title: '',
      partyeventid: '',
      uploadedOn: new Date(),
      uploadedBy: '',
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
            console.log("Download URL {}", this.downloadURL);
            partyImage.imageUrl = url;
            this.firestore.collection('images').add(partyImage);
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


    public getAllImages():Observable<any[]>{
      return this.firestore.collection('images').valueChanges();
    }
   
}

