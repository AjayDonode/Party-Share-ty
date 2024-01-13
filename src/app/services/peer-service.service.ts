import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Peer from 'peerjs';
import { UserService } from './user.service';
//import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PeerServiceService {

  private peer = new Peer();
  private conn =  this.peer.connect("another-peers-id");

  constructor(private firestore: AngularFirestore, private userService:UserService) {
    const peerId = this.userService.getCurrentUser().uid
    this.peer = new Peer(peerId, {
      host: '/', // Use your own server if required
      port: 9000, // Custom port if needed
      path: '/myapp'
    });

    this.peer.on('open', (id) => {
      console.log(`My peer ID is: ${id}`);
      // Store this ID in Firestore under the user's profile
      this.firestore.collection('users').doc('user-id').set({ peerId: id });
    });
  }

  connectToPeer(otherPeerId: string) {
    this.conn = this.peer.connect(otherPeerId);
    // Handle connection events...
  }

  // ... other methods to handle sending and receiving data
}
