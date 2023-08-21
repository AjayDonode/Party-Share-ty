import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PartyEvent } from 'src/app/VO/party-event';
import { finalize } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/services/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
   partyEvent: PartyEvent = {
    name:"Test Name", 
    hostedBy:"",
    startOn:new Date, 
    endBy:new Date, 
    title:"", 
    description:"", 
    imageUrl:""};

    imageUrl : string = "";
    currentUser:User = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false
    };

  constructor(private router:Router,private route:ActivatedRoute, private storage: AngularFireStorage, private eventService:EventService,private alertController: AlertController) { }

  ngOnInit() {
    this.currentUser =JSON.parse(localStorage.getItem('user')!);
    this.route.paramMap.subscribe((params) => {
      this.partyEvent = window.history.state.event;
    });
  }

  onFileSelected(event:any): void {
    const file = event.target.files[0];
    const user = JSON.parse(localStorage.getItem('user')!);
  
    const filePath = `users/${user.uid}/${this.partyEvent.name}/profile.jpg`; //TODO this need to be added to user id folder for security
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.imageUrl = url;
          this.partyEvent.imageUrl = url; // save image URL to user object
        });
      })
    ).subscribe();
  }

  addEvent(){
    this.partyEvent.hostedBy = this.currentUser.uid;
    console.log("Party Event now"+JSON.stringify(this.partyEvent));
    if(this.partyEvent.id === null || this.partyEvent.id === undefined)
      this.eventService.createPartyEvent(this.partyEvent).then(res => {  
      this.router.navigate(['/dashboard']);
      });
    else 
    this.eventService.updatePartyEvent(this.partyEvent).then(res => {  
      this.router.navigate(['/dashboard']);
      });
  }

  updateEvent(){
    this.partyEvent.hostedBy = this.currentUser.uid;
    console.log(this.partyEvent);
    this.eventService.updatePartyEvent(this.partyEvent).then(res => {  
    this.router.navigate(['/dashboard']);
    });
  }

  removeEvent(){
    this.partyEvent.hostedBy = this.currentUser.uid;
    console.log("Party Event now"+JSON.stringify(this.partyEvent));
    this.eventService.deletePartyEvent(this.partyEvent).then(res => {  
    this.router.navigate(['/dashboard']);
    });
  }

  async openStartPicker() {
    const alert = await this.alertController.create({
      header: 'Select Start Date',
      inputs: [
        {
          name: 'startOn',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            this.partyEvent.startOn = data.startOn;
          },
        },
      ],
    });

    await alert.present();
  }

  async openEndPicker() {
    const alert = await this.alertController.create({
      header: 'Select End Date',
      inputs: [
        {
          name: 'endBy',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            this.partyEvent.endBy = data.endBy;
          },
        },
      ],
    });

    await alert.present();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

}
