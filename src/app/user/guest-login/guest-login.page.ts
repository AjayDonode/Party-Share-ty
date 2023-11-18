import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.page.html',
  styleUrls: ['./guest-login.page.scss'],
})
export class GuestLoginPage {
  userId!: string;
  partyId!: string;
  passcode!: string;

  constructor(
    private authService: AuthService,
    private partyService: EventService ,
    private router: Router
  ) {}

  onSubmit() {
  //   this.authService.loginGuest(this.userId, this.passcode).subscribe(
  //     (token) => {
  //       this.partyService.getParty(this.partyId, token).subscribe(
  //         (party) => {
  //           this.router.navigate(['/party', this.partyId], {
  //             state: { userId: this.userId, party: party },
  //           });
  //         },
  //         (error) => console.log(error)
  //       );
  //     },
  //     (error) => console.log(error)
  //   );
  }
}