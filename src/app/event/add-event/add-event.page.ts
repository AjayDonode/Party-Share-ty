import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PartyEvent } from 'src/app/VO/party-event';
import { finalize } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/services/user';
import { AlertController, ModalController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  eventForm!: FormGroup<any>;

  partyEvent: PartyEvent = {
    name: "",
    hostedBy: "",
    startOn: new Date,
    endBy: new Date,
    title: "",
    description: "",
    imageUrl: "/assets/Party_People_sm1.png"
  };

 // imageUrl: string = "";

  currentUser: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false
  };


  constructor(private router: Router, private route: ActivatedRoute, private storage: AngularFireStorage,
    private eventService: EventService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.route.paramMap.subscribe((params) => {
      if(window.history.state.event != undefined){
       this.partyEvent = window.history.state.event
      }
    });

    this.eventForm = this.formBuilder.group({
      name:new FormControl(this.partyEvent.name,Validators.compose([Validators.minLength(5), Validators.required])),
      startOn:new FormControl(this.partyEvent.startOn,Validators.compose([Validators.required, this.dateValidator])),
      endBy:new FormControl(this.partyEvent.endBy,Validators.compose([Validators.required, this.dateValidator])),
      description:new FormControl(this.partyEvent.description,Validators.compose([Validators.minLength(10), Validators.required])),
    });
  
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const user = JSON.parse(localStorage.getItem('user')!);

    const filePath = `users/${user.uid}/${this.partyEvent.name}/profile.jpg`; //TODO this need to be added to user id folder for security
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
         // this.imageUrl = url;
          this.partyEvent.imageUrl = url; // save image URL to user object
        });
      })
    ).subscribe();
  }

  addEvent() {
    this.setPartyEvent();
    console.log("Party Event now" + JSON.stringify(this.partyEvent));
    if (this.partyEvent.id === null || this.partyEvent.id === undefined)
      this.eventService.createPartyEvent(this.partyEvent).then(res => {
        this.router.navigate(['/dashboard']);
      });
    else
      this.eventService.updatePartyEvent(this.partyEvent).then(res => {
        this.router.navigate(['/dashboard']);
      });
  }

  //This method sets data from form to partyevent Object
  private setPartyEvent() {
    this.partyEvent.hostedBy = this.currentUser.uid;
    this.partyEvent.name = this.eventForm.value.name;
    this.partyEvent.startOn = this.eventForm.value.startOn;
    this.partyEvent.endBy = this.eventForm.value.endBy;
    this.partyEvent.description = this.eventForm.value.description;
  }

  updateEvent() {
    this.partyEvent.hostedBy = this.currentUser.uid;
    this.eventService.updatePartyEvent(this.partyEvent).then(res => {
      this.router.navigate(['/dashboard']);
    });
  }

  removeEvent() {
    this.partyEvent.hostedBy = this.currentUser.uid;
    console.log("Party Event now" + JSON.stringify(this.partyEvent));
    this.eventService.deletePartyEvent(this.partyEvent).then(res => {
      this.router.navigate(['/dashboard']);
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }


  dateValidator(control:AbstractControl) {
    // Check if the input value matches a date format (MM/DD/YYYY)
    const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{4}$/;

    if (dateFormatRegex.test(control.value)) {
      return null; // Valid date format
    } else {
      return { invalidDate: true }; // Invalid date format
    }
  }

}//end