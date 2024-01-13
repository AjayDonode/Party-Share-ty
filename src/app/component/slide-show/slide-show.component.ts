import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PartyImage } from 'src/app/VO/party-image';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
})
export class SlideShowComponent  implements AfterViewInit  {
  
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  @Input()
  images: PartyImage[] = [];
  @Input()
  selectedImage!: PartyImage;
  @Input()
  imageIndex!: number;
 
  constructor(private modalController: ModalController) {
    //this.imageIndex=0;
   }

  // swiperOptions = {
  //   initialSlide: this.imageIndex,
  // };

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
  }


  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.imageIndex;
   // this.swiperThumbs.nativeElement.swiper.activeIndex = this.index;
  }


  closeModal() {
    this.modalController.dismiss();
  }
}
