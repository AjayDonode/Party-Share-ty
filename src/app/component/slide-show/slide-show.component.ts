import { Component, Input, OnInit } from '@angular/core';
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
  imageIndex:Number=0


  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  getImage(selectedImage:PartyImage){
    var imageUrl = selectedImage.imageUrl;
    if(imageUrl == undefined){  
     imageUrl = "/assets/dummy.jpeg";
    }
    return imageUrl;
  }


  closeModal() {
    this.modalController.dismiss();
  }
}
