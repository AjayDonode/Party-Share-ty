import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PartyImage } from 'src/app/VO/party-image';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
})
export class SlideShowComponent  implements OnInit {
  @Input()
  images: PartyImage[] = [];
  @Input()
  selectedImage!: PartyImage;
  @Input()
  imageIndex!: Number;
 
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.imageIndex = 7;
  }


  closeModal() {
    this.modalController.dismiss();
  }
}
