import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { EventUserAccess } from 'src/app/VO/events-user';
import { EventUserAccessService } from 'src/app/services/event-user-access.service';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-grant-access-modal',
  templateUrl: './grant-access-modal.page.html',
  styleUrls: ['./grant-access-modal.page.scss'],
})
export class GrantAccessModalPage implements OnInit {
  patchEventId:any;
  userAccessList:any;
  constructor(private navParams: NavParams, private userService:UserService, private accessServcie:EventUserAccessService, public modalController: ModalController) { }
  
  ngOnInit() {
    this.patchEventId = this.navParams.get('data');
    this.accessServcie.getAccessList(this.patchEventId).subscribe(res=> {
    this.userAccessList = res});
  }

  updateGrant(event:any,userAccess:EventUserAccess){
    console.log(event.target.checked);
    userAccess.granted = event.target.checked;
    userAccess.grantedOn = new Date();
    userAccess.grantedBy = this.userService.getCurrentUser().email;
    this.accessServcie.updateAccess(userAccess);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
