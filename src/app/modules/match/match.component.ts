import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
import { SliderModel } from './model/slidermodel';
import { nftSlider } from './const/nft-sliderconst';
import { DataService } from '../../core/services/dataservice/data.service';
import { Router } from '@angular/router';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([Autoplay]);



@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss', './../nft-select/nft-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatchComponent implements OnInit {

  slides: SliderModel[] = nftSlider;
  




  initialSlideStartIndex = Math.floor((this.slides.length - 1) / 2);
  sliderIndex = this.initialSlideStartIndex;
  currentSliderName = this.slides[this.sliderIndex].name;

    config: SwiperOptions = {
      slidesPerView: 1,
      effect: 'coverflow',
      direction: 'horizontal',
      centeredSlides: true,
      preventClicks:false,
      preventClicksPropagation:false,
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

  defaultImage = 'assets/lazyLoading.gif'
  ownwnerWallet: any;
  nftCards: any;
  activeNftID: any;
  isSignatureTrue: any = '';
  currentNftDetais: any;
  isConnected: boolean=false;
  constructor(
    private Dataservice: DataService,
    private router: Router,
    private metamask: ConnetmetamaskService,
    private storage : LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');
    this.metamask. getWalletObs().subscribe((data: any) => {
      if(this.metamask.isAddressValid(data))
      {
        this.isConnected=true;
        this.ownwnerWallet = data;
        this.getNft();
      }
      else
      {
        this.isConnected = false;
      }
  });  
  }

  getNft() {
    const url = 'user/getBreedingMatch?nftId='+this.currentNftDetais.token_id;

    this.Dataservice.getRequest(url).subscribe(
      (res: any) => {
        this.nftCards = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  gotoYourMatch(slide: any) {
    sessionStorage.setItem('selectURBreeding', JSON.stringify(slide));
    this.router.navigate(['/select-breed/selected-target']);
  }
  click1()
  {
    console.log("hh")
  }


  gotoshowProfile(nftid: any) {
        this.nftCards.forEach((element: any) => {
          if (element.NftId == nftid) {
            this.router.navigate(['/profile'], { queryParams: { nft: nftid } });
          }
        });
      
  }

  onIndexChange(event: any) {
    if(this.nftCards?.length>0){
    this.activeNftID = this.nftCards[event.realIndex]?.NftId;
    this.currentSliderName = this.slides[event.realIndex]?.name;
    }
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
}
