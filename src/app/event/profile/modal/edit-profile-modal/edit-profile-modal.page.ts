import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/services/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.page.html',
  styleUrls: ['./edit-profile-modal.page.scss'],
})
export class EditProfileModalPage implements OnInit {

  savedUser: any = null;
  user: any = null;

  constructor(private userService:UserService, private navParams: NavParams,public modalController: ModalController) { }

  ngOnInit() {
    this.savedUser = this.navParams.get('data');
    console.log(this.savedUser);
    this.userService.getUserByUid(this.savedUser.uid).subscribe(res => {
      this.user = res;
    });
    console.log(this.user);
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }

  updateUser(){
    console.log(this.user);
    this.userService.updateUserData(this.user);
  }
}
