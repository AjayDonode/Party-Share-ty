import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PartyEvent } from 'src/app/VO/party-event';
import { finalize } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  event: PartyEvent = {
    name:"", 
    hostedBy:"",
    startOn:new Date, 
    endBy:new Date, 
    title:"", 
    description:"", 
    imageUrl:""};

    imageUrl : string = "";
    currentUser:string=""

  constructor(private router:Router, private storage: AngularFireStorage, private eventService:EventService) { }

  ngOnInit() {
    this.currentUser =JSON.parse(localStorage.getItem('user')!);
  }

  onFileSelected(event:any): void {
    const file = event.target.files[0];
    const user = JSON.parse(localStorage.getItem('user')!);
  
    const filePath = `users/${user.uid}/${this.event.name}/profile.jpg`; //TODO this need to be added to user id folder for security
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.imageUrl = url;
          this.event.imageUrl = url; // save image URL to user object
        });
      })
    ).subscribe();
  }

  addEvent(){
    this.event.hostedBy = this.currentUser;
    this.event.startOn = new Date;
    this.event.endBy = new Date;
    this.eventService.createPartyEvent(this.event).then(res => {  
    this.router.navigate(['/dashboard']);
    });
  }
}
