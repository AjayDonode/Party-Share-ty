import { Component, Input, OnInit } from '@angular/core';
import { PartyImage } from 'src/app/VO/party-image';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
})
export class SlideShowComponent  implements OnInit {
  @Input()
  images: string[] = [];
  @Input()
  selectedImage!: PartyImage;
  constructor() { }

  ngOnInit() {}

  getImage(selectedImage:PartyImage){
    var imageUrl = selectedImage.imageUrl;
    if(imageUrl == undefined){  
     imageUrl = "/assets/dummy.jpeg";
    }
    return imageUrl;
  }

}
