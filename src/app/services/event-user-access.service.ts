import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { EventUserAccess } from '../VO/events-user';
import { PartyEvent } from '../VO/party-event';
import { User } from './user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventUserAccessService {

  constructor(private firestore: AngularFirestore, private userService:UserService) { }

  // Function to check if the current user has access granted
  getEventUserAccess(userid: string): Observable<EventUserAccess[]> {
    return this.firestore
      .collection<EventUserAccess>('eventUser', ref => 
      ref.where('userid', '==', userid)
    ).valueChanges();
  }

  getAccessList(eventid: string) {
    let currentUserId = this.userService.getCurrentUser().uid;
    console.log("Event ID "+eventid);
    return this.firestore.collection<EventUserAccess>('eventUser', ref => 
      ref.where('eventid', '==', eventid)).valueChanges().pipe(
        switchMap(eventUsers => {
          let userIDs = eventUsers.map(eu => eu.userid);
          console.log("userIDs"+userIDs)
          if (userIDs.length === 0) {
            // If there are no userIDs, return an empty array to avoid unnecessary query
            return from([[]]);
          } 
         
        return this.firestore.collection('users', ref => ref.where('uid', 'in', userIDs)).valueChanges({ idField: 'uid' })
        .pipe(map(users=>{
          return users.map(user => {
            // if(user.uid !== currentUserId){
            const eventUser = eventUsers.find(eu => eu.userid === user.uid);
            return { user, eventUser };
            // }
          })
        }));
      })
    );
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
