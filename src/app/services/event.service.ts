import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { PartyEvent } from '../VO/party-event';
import { AngularFirestoreCollection,AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //private partyEventlist: Observable<PartyEvent[]>;
  private partyEventCollection: AngularFirestoreCollection<PartyEvent>;
  private readonly collectionName = 'partyEvents';
  private selectedEvent:PartyEvent | undefined;

  constructor(private firestore: AngularFirestore) {
    this.partyEventCollection = this.firestore.collection<PartyEvent>(this.collectionName);
  }

  // Create a new party event
  createPartyEvent(partyEvent: PartyEvent): Promise<void> {
    const id = this.firestore.createId();
    partyEvent.id = id;
    return this.partyEventCollection.doc(id).set(partyEvent);
  }

  getPartyEventById(id: string) {
    return this.partyEventCollection.doc<PartyEvent>(id).valueChanges();
  }

  // Get all party events
  getAllPartyEvents(): Observable<PartyEvent[]> {
    return this.partyEventCollection.valueChanges();
  }

  // Update a party event
  updatePartyEvent(partyEvent: PartyEvent): Promise<void> {
    const id = partyEvent.id;
    delete partyEvent.id; // Remove the ID from the object to prevent overwriting it
    return this.partyEventCollection.doc(id).update(partyEvent);
  }

  // Delete a party event
  deletePartyEvent(id: string): Promise<void> {
    return this.partyEventCollection.doc(id).delete();
  }

  getSelectedEvent(){
    return this.selectedEvent;
  }
  setSelectedEvent(selectedEvent:PartyEvent){
    return this.selectedEvent= selectedEvent;
  }
}
