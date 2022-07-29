import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
import { SliderModel } from '../select-breed/model/slidermodel';
import { nftSlider } from '../select-breed/const/nft-sliderconst';
import { DataService } from '../../core/services/dataservice/data.service';
import { Router } from '@angular/router';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-reply-super-like',
  templateUrl: './reply-super-like.component.html',
  styleUrls: ['./reply-super-like.component.scss']
})
export class ReplySuperLikeComponent implements OnInit {

  defaultImage = 'assets/lazyLoading.gif'
  ownwnerWallet: any;
  nftCards: any;
  activeNftID: any;
  isSignatureTrue: any = '';
  currentNftDetais: any;
  isConnected: boolean = false;
  likeToyouNft: any;
  youLikeByNft: any;
  nftid!: number;
  NftAddress!: string;
  isTimeOut = true
  constructor(
    private Dataservice: DataService,
    private router: Router,
    private metamask: ConnetmetamaskService,
    private storage: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.metamask.getWalletObs().subscribe((data: any) => {
      if (this.metamask.isAddressValid(data)) {
        this.isConnected = true;
        this.ownwnerWallet = data;
        this.getNft();
      }
      else {
        this.isConnected = false;
      }
    });
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');
  }

  getNft() {

    const url = 'User/superlikeList?nftId=' + this.currentNftDetais.nftid;

    this.Dataservice.getRequest(url).subscribe(
      (res: any) => {
        console.log(res);
        this.likeToyou(res?.data?.likeToYou);
        this.youLikeBy(res?.data?.youLikeBy)
      },
      (err) => {
        console.log(err);
      }
    );
    debugger
  }
  likeToyou(res: any) {
    this.likeToyouNft = res
  }
  youLikeBy(res: any) {
    this.youLikeByNft = res
    let currentDate = new Date()
    res.forEach((element:any)=>{
      if(element.endDate<currentDate){
        this.isTimeOut = false
      }
    })

  }

  gotoYourMatch(slide: any) {
    sessionStorage.setItem('selectURBreeding', JSON.stringify(slide));
    this.router.navigate(['/match']);
  }


  gotoshowProfile(nftid: any, isLiketoyouNft: any) {
      if (isLiketoyouNft) {
        this.youLikeByNft.forEach((element: any) => {
          if (element.fromNftId == nftid.fromNftId) {
            this.router.navigate(['/profile'], { queryParams: { nft: nftid?.fromNftId } });
          }
        });
      } else {
        this.likeToyouNft.forEach((element: any) => {
          if (element.fromNftId == nftid.fromNftId) {
            this.router.navigate(['/profile'], { queryParams: { nft: nftid?.fromNftId } });
          }
        });
      }
  }

  async acceptSuperLike(item: any) {
    try {
      let txn = await this.metamask.acceptSuperLike(item.fromNftId, this.currentNftDetais.token_address, item.toNftId, item.NftAddress);
      await txn.wait(3);
      this.router.navigate(['select-breed/selected-target'])
      this.metamask.alertSuccess(true, "Super liked");
    }
    catch (e: any) {
      console.log(e.data.message);
      this.metamask.alertError(e?.data?.message)
    }
  }

  async rejectSuperLike(item: any) {

    try {
      let txn = await this.metamask.rejectSuperLike(item.fromNftId, this.currentNftDetais.token_address, item.toNftId, item.NftAddress)
      await txn.wait(3);
      this.metamask.alertSuccess(true, "rejected Super Like");
    } catch (e: any) {
      this.metamask.alertError(e?.data?.message);
    }
  }

  async claimPendingTokens(item: any) {
    try {
      // let data: any = {
      //   this.currentNftDetais.token_id, this.currentNftDetais.token_address, item.toNftId
      // };

      var signature: any = await this.metamask.signMessage(JSON.stringify(this.currentNftDetais.token_id, this.currentNftDetais.token_address, item.toNftId));


      if (signature.status) {
      let txn = await this.metamask.claimPendingTokens(this.currentNftDetais.token_id, this.currentNftDetais.token_address, item.toNftId, item.NftAddress,signature.signature);
      await txn.wait(3);
      this.metamask.alertSuccess(true, "Super liked");
      }
      else
      {
        this.metamask.alertSuccess(false,"Signature is required....");
      }
      //10909,10910,0x88b451a19b60a3c7aa4a166a616409d4767958a2
    } catch (e: any) {
      console.log(e);
      this.metamask.alertError(e?.data?.message)
    }
  }
}
