import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EventUserAccess } from '../VO/events-user';
import { PartyEvent } from '../VO/party-event';

@Injectable({
  providedIn: 'root'
})
export class EventUserAccessService {

  constructor(private firestore: AngularFirestore) { }

  // Function to check if the current user has access granted
  getEventUserAccess(userid: string): Observable<EventUserAccess[]> {
    console.log("User ID "+userid);
    return this.firestore
      .collection<EventUserAccess>('eventUser', ref => 
      ref.where('userid', '==', userid)
    ).valueChanges();
  }

  getAccessList(eventid: string): Observable<EventUserAccess[]> {
    console.log("Event ID "+eventid);
    return this.firestore
      .collection<EventUserAccess>('eventUser', ref => 
      ref.where('eventid', '==', eventid)
    ).valueChanges();
  }

 
  requestAccess(userId: string, partyEvent: PartyEvent): Promise<void> {
    const id = this.firestore.createId();
    let eventUserAccess : EventUserAccess = {
      id:id,
      eventid: new String(partyEvent.id).toString(),
      userid: userId,
      granted: false,
      grantedOn: new Date,
      grantedBy: "",
      endBy: new Date
    };
    return this.firestore
      .collection('eventUser')
      .doc(id)
      .set(eventUserAccess);
  }

    // Update a party event
    updateAccess(userAccess: EventUserAccess): Promise<void> {
      const id = userAccess.id;
     // delete partyEvent.id; // Remove the ID from the object to prevent overwriting it
      return this.firestore.collection('eventUser').doc(id).update(userAccess);
    }

}
