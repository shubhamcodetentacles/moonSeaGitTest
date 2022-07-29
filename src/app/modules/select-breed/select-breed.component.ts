import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
// import { SliderModel } from '../modules/model/slidermodel';
// import { nftSlider } from '../modules/const/nft-sliderconst';
import { DataService } from '../../core/services/dataservice/data.service';
import { Router } from '@angular/router';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogComponent } from 'src/app/common-component/reusable-dialog/reusable-dialog.component';


SwiperCore.use([EffectCoverflow]);
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-select-breed',
  templateUrl: './select-breed.component.html',
  styleUrls: ['./select-breed.component.scss', '../../modules/match/match.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectBreedComponent implements OnInit {
  @ViewChildren('tinderCard') tinderCards!: QueryList<ElementRef>;

  cards: any
  tinderCardsArray!: Array<ElementRef>;
  moveOutWidth!: number;
  shiftRequired!: boolean;
  transitionInProgress!: boolean;
  heartVisible: boolean = false
  crossVisible: boolean = false;

  defaultImage = 'assets/siteimage/image-not-found.jpg'
  contractAddress = environment.ContactAddress;
  isConnected: boolean = false;
  currentAddress: any;
  heart: boolean = false;
  ownwnerWallet: any;
  superLike: any;
  cross: any;
  currentNftDetais: any;
  clickImage: number = 0;

  isDisabled = false
  returnCard: any;
  yourCrossLimit: boolean = true;
  body: any
  sign: any;
  timer$: any;
  isTimer = false;
  interval:any;
  counter: any;
  swipeCount=0;
  constructor(
    private data: DataService,
    private router: Router,
    private metamask: ConnetmetamaskService,
    private local: LocalStorageService,
    private renderer: Renderer2,
    private storage: LocalStorageService,
    private ngxSpinner: NgxSpinnerService,
    public matDialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');
    this.metamask.getWalletObs().subscribe((data: any) => {
      if (this.metamask.isAddressValid(data)) {
        this.isConnected = true;
        this.currentAddress = data;
        this.ownwnerWallet = data;
        this.getNft();
        // this.spiner.hide();
      } else {
        this.isConnected = false;
        // this.spiner.hide();
      }
    });
  }

  getNft() {
    const url = 'user/selectForBreeding?nftId=' + this.currentNftDetais.nftid
    this.data.getRequest(url).subscribe(
      (res: any) => {
        this.cards = res.data.getNftLists;
        if (res.data.viewLimit == undefined) {
          this.yourCrossLimit = false
          if (res.data.length == 0) {

          }
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  gotoshowProfile(nftid: any) {
    if (this.clickImage == 0 || this.clickImage == undefined) {
      this.cards.forEach((element: any) => {
        if (element.NftId == nftid) {
          this.router.navigate(['/profile'], { queryParams: { nft: nftid } });
        }
      });
    }
  }
  userClickedButton(event: any, superLike: any, heart: any , isprofile:any) {
    event.preventDefault();
    if (heart) {
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + this.moveOutWidth + 'px, 100px) rotate(-30deg)');
      this.toggleChoiceIndicator(false, false, true,false);
      this.heart = true
      this.cross = false
      this.superLike = false
    } else if (superLike) {
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate( 0px , -1000px) rotate(-30deg)');
      this.toggleChoiceIndicator(false, true, false,false);
      this.heart = false
      this.cross = false
      this.superLike = true
    }else if(isprofile){
      let item = this.cards?.[0]
      this.gotoshowProfile(item.NftId)
    }
    else {
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)');
      this.toggleChoiceIndicator(true, false, false,false);
      this.heart = false
      this.cross = true
      this.superLike = false
    };
    this.shiftRequired = true;
    this.transitionInProgress = true;
  };

  handlePan(event: any) {
    console.log(event.deltaX, event.deltaY);
    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) return;

    this.clickImage = event.deltaX
    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 170) {

      this.toggleChoiceIndicator(false, false, true,false);
      this.heart = true
      this.cross = false
      this.superLike = false
    } else if (event.deltaX < -170) {
      this.toggleChoiceIndicator(true, false, false,false);
      this.heart = false
      this.cross = true
      this.superLike = false
    }

    else if (event.deltaY < -125 || event.deltaX > 125) {
      this.toggleChoiceIndicator(false, true, false,false);
      this.heart = false
      this.cross = false
      this.superLike = true

    } else if(event.deltaY>50 || event.deltaX>50){
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;

    let rotate = xMulti * yMulti;
    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;
  };

  handlePanEnd(event: any) {
    this.toggleChoiceIndicator(false, false, false,false);
    if (!this.cards.length) {
      return;
    }

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');
    let keep = Math.abs(event.velocityX) < 0.001 || Math.abs(event.velocityY) < 0.001;

    if (keep) {

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;

    } else {

      let endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');
      this.shiftRequired = true;
    }
    this.transitionInProgress = true;
    this.clickImage = 0
  };
  // handlePanup(value: any) {
  //   this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');
  //   this.toggleChoiceIndicator(false, true, false)
  // }
  toggleChoiceIndicator(cross: any, superLike: any, heart: any , isprofile:any) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  };

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false, false,false)
    if (this.shiftRequired) {
      this.shiftRequired = false;
      let data = this.cards.shift();
      this.returnCard = data
      if (this.heart) {
        this.heart = false
        this.like(data);
      } else if (this.cross) {
        this.dislike(data)
      }
      else if (this.superLike) {

        this.superLikeSave(data)
      }
    };
  };
  async superLikeSave(data: any) {
    this.saveApi(data, 3, 'superLike', true)
  }
  like(data: any) {
    this.saveApi(data, 1, 'Like to NFT id ' + data.NftId, false)
  }
  dislike(data: any) {
    this.saveApi(data, 2, 'DisLike to NFT id ' + data.NftId, false)
  }
  async saveApi(data: any, likestatus: any, message: any, isSuperLike: any) {

    if (isSuperLike) {
      try {
        let body: any = {
          "formNftId": parseInt(this.currentNftDetais.token_id),
          "formNftAddress": this.ownwnerWallet,
          "toNftId": data.NftId,
          "toNftAddress": data.NftAddress,
          "userAddress": this.currentAddress
        }
        await this.data.postRequest(body, 'user/encryptedSignature').subscribe(async (res: any) => {
          this.sign = res

          let amount = await this.metamask.getSuperLikeCost();
          await this.metamask.checkAllowance(environment.ra8BitsToken, amount)
            try {
              this.matDialog.open(ReusableDialogComponent, {
                height: '250px',
                width: '300px',
                data: {}
              })
              let approveTxn: any = await this.metamask.approveToken(amount, environment.ra8BitsToken)
              this.data.matDialogData$.next({data:true})
              await approveTxn.hash.wait(2);
                this.metamask.superLikeSign(parseInt(this.currentNftDetais.token_id), this.ownwnerWallet, data.NftId, data.NftAddress, this.sign.data.signature, amount, (this.sign.data.salt).toString()).then((res: any) => {
                this.matDialog.closeAll()
                this.metamask.alertSuccess(res.status , 'Transaction Success')
              })

            } catch (e) {
              this.matDialog.closeAll()
              this.cards.unshift(this.returnCard)
            }

        })

      } catch (e: any) {
        console.log(e);
      }
    } else {
      try {
        let signature: any = await this.metamask.signMessage(message);
        let body = {
          fromNftId: this.currentNftDetais.token_id,
          toNftId: data.NftId,
          fromAddress: this.ownwnerWallet,
          Status: likestatus,
          Signature: signature.signature,
        };
        this.data.postRequest(body, 'user/likeSave').subscribe(
          (res: any) => {
            if (res.status == 200) {
              // this.swipeCount++
              this.metamask.alertSuccess(true, res.message);
              // if(this.swipeCount==3){
                this.getNft();
              // }
            } else {
              this.metamask.alertError(res.message);
              // alert(res.message);
            }
          });
      } catch (e: any) {
        this.metamask.alertError(e.message);
        this.cards.unshift(this.returnCard)
      }

    }

  }
  async viewMore() {
    try {
    debugger
    let amount = await this.metamask.tokenAmountForSwiping();
    this.matDialog.open(ReusableDialogComponent, {
      height: '250px',
      width: '300px',
      data: {}
    })
     if(!await this.metamask.checkAllowance(environment.ra8BitsToken, amount)){
      let approveTxn: any = await this.metamask.approveToken(amount, environment.ra8BitsToken)
      await approveTxn.hash.wait(2);
     }

     this.data.matDialogData$.next({data:true})
     await this.metamask.sendTokensForSwiping().then(res=>{
      this.matDialog.closeAll()
      this.metamask.alertSuccess(true, "Your Transaction is success");
      this.isTimer = true
       this.counter = 59

     this.interval = setInterval(() => {
     this.counter--;

    if (this.counter <= 0 ) {
      clearInterval(this.interval);
    }
  }, 1000);
      setTimeout(() => {
        this.getNft()
      }, 60000);
      });

    } catch (e: any) {
      this.matDialog.closeAll()
      this.metamask.alertError(e.data.message);
    }
  }
  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    })
  };
}









