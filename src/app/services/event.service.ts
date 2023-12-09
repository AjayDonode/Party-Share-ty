import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { PartyEvent } from '../VO/party-event';
import { AngularFirestoreCollection,AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter, map, of, switchMap } from 'rxjs';
import { EventUserAccessService } from './event-user-access.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private partyEvents: Observable<PartyEvent[]> | undefined;
  private partyEventCollection: AngularFirestoreCollection<PartyEvent>;
  private readonly collectionName = 'partyEvents';
  private selectedEvent:PartyEvent | undefined;

  constructor(private firestore: AngularFirestore, private accessServcie:EventUserAccessService) {
    this.partyEventCollection = this.firestore.collection<PartyEvent>(this.collectionName);
  }

  // Create a new party event
  createPartyEvent(partyEvent: PartyEvent): Promise<void> {
    const id = this.firestore.createId();
    partyEvent.id = id;
    return this.partyEventCollection.doc(id).set(partyEvent);
  }

  getPartyEventById(id: string)  {
    return this.partyEventCollection.doc<PartyEvent>(id).valueChanges();
  }

  getPartyEventByHost(hostedBy: string) :Observable<PartyEvent[]>{
    return this.firestore.collection<PartyEvent>('partyEvents', ref => ref.where('hostedBy', '==', hostedBy)
    ).valueChanges();
  }

  getSharedPartyEventByUserId(userId: string) {
    return this.accessServcie.getEventUserAccess(userId).pipe(
      switchMap((userAccessList: any[]) => {
        const eventids = userAccessList.map(userEvent => userEvent.eventid);
        if (eventids.length > 0) {
          return this.firestore.collection('partyEvents', ref => ref.where('id', 'in', eventids)).valueChanges();
        } else {
          return of([]); // Return an empty array if there are no eventIds
        }
      })
    );
  }

  // Get all party events
  getAllPartyEvents(): Observable<PartyEvent[]> {
    return this.partyEventCollection.valueChanges();
  }

  // Update a party event
  updatePartyEvent(partyEvent: PartyEvent): Promise<void> {
    const id = partyEvent.id;
   // delete partyEvent.id; // Remove the ID from the object to prevent overwriting it
    return this.partyEventCollection.doc(id).update(partyEvent);
  }

  // Delete a party event
  deletePartyEvent(partyEvent: PartyEvent): Promise<void> {
    return this.partyEventCollection.doc(partyEvent.id).delete();
  }

  getSelectedEvent(){
    const partyEvent: PartyEvent = JSON.parse(localStorage.getItem('selectedEvent')!);
    return partyEvent;
  }

  setSelectedEvent(partyEvent:PartyEvent){
    if(partyEvent.id !== undefined){
    localStorage.setItem('selectedEvent', JSON.stringify(partyEvent));
    }
  }

  requestEventAccess(partyEvent: PartyEvent, uid:string, passcode:string){
    if (passcode === null || passcode === '') {
      this.accessServcie.requestAccess(uid, partyEvent).then(resp=> { console.log(resp)});
    } else {
      //TODO validate with Passcode
    }
    
  }

}
