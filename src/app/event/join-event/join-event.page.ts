import { Component, OnInit } from '@angular/core';
import { PartyEvent } from 'src/app/VO/party-event';
import { EventUserAccessService } from 'src/app/services/event-user-access.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.page.html',
  styleUrls: ['./join-event.page.scss'],
})
export class JoinEventPage implements OnInit {
  partyEvent: any;
  passcode:any = "";
  userId:any;
  userAccessList:any;
  constructor(private eventService:EventService, private userService:UserService, private accessServcie:EventUserAccessService) { }

  ngOnInit() {
    this.userId = this.userService.getCurrentUser().uid
    this.checkAccess();
  }

  onSearch(event: any) {
    console.log("Query is "+event.target.value);
    this.eventService.getPartyEventById(event.target.value).subscribe(res=>{
      console.log(res);
      this.partyEvent = res;
    }); 
  }

  joinEvent(partyEvent: PartyEvent){
    this.eventService.requestEventAccess(partyEvent, this.userId, this.passcode);
  }

  checkAccess(){
    console.log("Calling thismethiod ");
    this.accessServcie.getEventUserAccess(this.userId).subscribe(res=> { console.log("Calling thismethiod "+res)
    this.userAccessList = res});
  }
  

}
