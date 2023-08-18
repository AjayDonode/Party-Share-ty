import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.page.html',
  styleUrls: ['./edit-profile-modal.page.scss'],
})
export class EditProfileModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
}
