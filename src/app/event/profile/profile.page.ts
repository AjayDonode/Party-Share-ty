import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';
import { EditProfileModalPage } from './modal/edit-profile-modal/edit-profile-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false
  };
  constructor(private modalController: ModalController, public userService:UserService) {
    this.user = this.userService.getCurrentUser();
    console.log(this.user.email);
   }

  ngOnInit() {
    console.log(this.user.email);
    this.user = this.userService.getCurrentUser();
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: EditProfileModalPage, // Replace with your actual edit modal component
      // You can pass data to the modal if needed
    });
    await modal.present();
  }

}
