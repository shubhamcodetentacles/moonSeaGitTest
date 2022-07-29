import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
import { SliderModel } from '../nft-detail/model/slidermodel';
import { nftSlider } from '../nft-detail/const/nft-sliderconst';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { ActivatedRoute, Router } from '@angular/router';
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([Autoplay]);



@Component({
  selector: 'app-super-powers',
  templateUrl: './super-powers.component.html',
  styleUrls: ['./super-powers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SuperPowersComponent implements OnInit {

  slides: SliderModel[] = nftSlider;

  initialSlideStartIndex = Math.floor((this.slides.length - 1) / 2);
  sliderIndex = this.initialSlideStartIndex;
  currentSliderName = this.slides[this.sliderIndex].name;

  config: SwiperOptions = {
    slidesPerView: 1,
    effect: 'coverflow',
    direction: 'horizontal',
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 1000,
    centerInsufficientSlides: true,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: true,
    initialSlide: 1,
    loop: false,
    coverflowEffect: {
      depth: 400,
      slideShadows: false,
      rotate: 0,
      stretch: -100,
    },
    breakpoints: {
      1200: {
        slidesPerView: 'auto',
      },
      700: {
        slidesPerView: 'auto',
      },
      600: {
        slidesPerView: 'auto',
        coverflowEffect: {
          stretch: 0,
        },
      },
      500: {
        slidesPerView: 'auto',
        coverflowEffect: {
          stretch: 0,
        },
      },
      300: {
        slidesPerView: 'auto',
        coverflowEffect: {
          stretch: 0,
        },
      },
      200: {
        slidesPerView: 'auto',
        coverflowEffect: {
          stretch: 0,
        },
      },
    },
  };




  
  ownerAddressKey: any;
  nftCards: any = [];
  nftImageArray: any = [];
   item:any
  constructor(private metamask:ConnetmetamaskService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
       this.item = res
    })
   }
  superPower(){
    this.router.navigate(['/b-inprogress',{...this.item , isDisable:true}])
     this.metamask.sendSpecialNft("_breedId" , "specialNft " , "specialtANFTAddress").then(res=>{
      // this.router.navigate(['/b-inprogress',{...this.item , isDisable:true}])
    }).catch(e=>{
        
    })
  }

 

  onIndexChange(event: any): void {
    this.currentSliderName = this.slides[event.realIndex].name;
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

}
