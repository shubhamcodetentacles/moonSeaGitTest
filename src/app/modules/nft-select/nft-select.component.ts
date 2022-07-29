import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
import { SliderModel } from '../nft-detail/model/slidermodel';
import { nftSlider } from '../nft-detail/const/nft-sliderconst';
import { DataService } from '../../core/services/dataservice/data.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import swiper from 'swiper';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
SwiperCore.use([EffectCoverflow]);
// SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-nft-select',
  templateUrl: './nft-select.component.html',
  styleUrls: ['./nft-select.component.scss', './../match/match.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NftSelectComponent implements OnInit {
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
  nftCards: any
  defaultImage = 'assets/lazyLoading.gif'
  contractAddress = environment.ContactAddress;
  isConnected: boolean = false;
  currentAddress: any;
  heart: boolean = false;
  ownwnerWallet: any;
  superLike: any;
  cross: any;
  bufferNft: any;
  size=5;
  nextSize=6;
  buyNft: any;
  constructor(
    private data: DataService,
    private router: Router,
    private metamask: ConnetmetamaskService,
    private local: LocalStorageService,

  ) { }

  ngOnInit(): void {
    this.metamask.getWalletObs().subscribe((data: any) => {
      if (this.metamask.isAddressValid(data)) {
        this.isConnected = true;
        this.currentAddress = data;
        this.ownwnerWallet = data;
        this.getNftList();
        // this.spiner.hide();
      } else {
        this.isConnected = false;
        // this.spiner.hide();
      }
    });
    var mySwiper = new Swiper('.landing-carousel', {
      autoplay: {
        delay: 5000,
      },
    });
  }

  getNftList() {
    const url =
      'https://deep-index.moralis.io/api/v2/' +
      this.currentAddress +
      '/nft/' +
      this.contractAddress +
      '?chain=bsc+testnet&format=decimal';
    this.data.Moralis(url).subscribe((res: any) => {
      this.bufferNft = res.result;
      this.nftCards = this.bufferNft.slice(0, 5)
      this.nftCards.forEach((element: any) => {
        this.data
          .getRequestWithoutHeader(element.token_uri)
          .subscribe(
            (response: any) => {
              element.name = response.name;
              element.imagePath = response.image;
              element.nftid = response.id;
              element.description = response.description;
              element.attributes = response.attributes;
              element.type = 'img';
            },
            (err) => {
              console.log(err);
            }
          )
      });
    if(this.nftCards.length==0){
      this.buyNft = true
    }
    });
  }

  gotonftDetails(slide: any) {
    if (!slide.name) return
    this.local.store('myNFT', JSON.stringify(slide));
    this.router.navigate(['/select-breed']);
    this.router.navigate(['/nft-detail']);
  }

  onIndexChange(event: any): void {
   
    this.currentSliderName = this.slides[event.realIndex]?.name;
         
    if(this.bufferNft!=undefined && this.bufferNft.length>=this.nextSize){
    
    if (this.bufferNft != undefined && event.activeIndex>event.previousIndex) {
      let dt = this.bufferNft.slice(this.size, this.nextSize)
      this.size++
      this.nextSize++
      dt.forEach((element: any) => {
        this.data
          .getRequestWithoutHeader(element.token_uri)
          .subscribe(
            (response: any) => {
              element.name = response.name;
              element.imagePath = response.image;
              element.nftid = response.id;
              element.description = response.description;
              element.attributes = response.attributes;
              element.type = 'img';
            
            },
            (err) => {
              console.log(err);
            }
          )
      });  
      if ( dt!= undefined) {
          this.nftCards.push(...dt)
          
      }

    }
  }
  }


  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
