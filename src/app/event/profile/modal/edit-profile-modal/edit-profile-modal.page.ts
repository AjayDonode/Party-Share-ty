import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.page.html',
  styleUrls: ['./edit-profile-modal.page.scss'],
})
export class EditProfileModalPage implements OnInit {

  user: any = null;

  constructor(private navParams: NavParams,public modalController: ModalController) { }

  ngOnInit() {
    this.user = this.navParams.get('data');
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }
}
