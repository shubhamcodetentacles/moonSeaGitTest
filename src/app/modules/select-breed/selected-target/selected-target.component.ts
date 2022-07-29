import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/dataservice/data.service';
import { ConnetmetamaskService } from 'src/app/core/services/metamask/connetmetamask.service';
import { LocalStorageService } from 'src/app/core/services/dataservice/local-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogComponent } from 'src/app/common-component/reusable-dialog/reusable-dialog.component';

@Component({
  selector: 'app-selected-target',
  templateUrl: './selected-target.component.html',
  styleUrls: ['./selected-target.component.scss', './../../nft-detail/nft-detail.component.scss']
})
export class SelectedTargetComponent implements OnInit {
  yourNft01: any = {};
  OtherNft: any = {};
  currentNftDetais: any;
  isConnected: boolean = false;
  ownwnerWallet: any;
  defaultImage = 'assets/lazyLoading.gif'
  waitForPartnerTime: any;
  showTime: any;
  day: any
  hour: any;
  minute: any;
  second: any;
  breedingTime: any;

  constructor(private data: DataService,
    private metamask: ConnetmetamaskService,
    private storage: LocalStorageService,
    private dataservice: DataService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentNftDetais = JSON?.parse(this.storage.retrieve('myNFT') || '{}');
    this.metamask.getWalletObs().subscribe((data: any) => {
      if (this.metamask.isAddressValid(data)) {
        this.isConnected = true;
        this.ownwnerWallet = data;
        this.getYourNftDetails();
      }
      else {
        this.isConnected = false;
      }
    });

    this.OtherNft = JSON.parse(sessionStorage.getItem('selectURBreeding') || '');
    this.getNftDetailsOfTarget();

  }

  getYourNftDetails() {

    this.data.getRequestWithoutHeader(this.currentNftDetais.token_uri).subscribe(
      (data: any) => {
        this.currentNftDetais.details = data;
        console.log("token uri ===>", this.yourNft01);
      }
    )
  }

  getNftDetailsOfTarget() {
    var contractAddress = environment.ContactAddress;
    const url =
      'https://deep-index.moralis.io/api/v2/nft/' +
      contractAddress + '/' +
      this.OtherNft.NftId + '?chain=bsc%20testnet&format=decimal';

    this.dataservice.Moralis(url).subscribe(
      (res: any) => {
        this.dataservice
          .getRequestWithoutHeader(res.token_uri)
          .subscribe((response: any) => {

            this.OtherNft.details = response;
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async sendToBreeding() {
    try {
      await this.metamask.waitForPartnerTime().then((res) => {
        let d = parseInt(res.toString())
        this.waitForPartnerTime = d
      })
      this.metamask.breedingTime().then(res => {
        let d = parseInt(res.toString())
        this.breedingTime = d
      })
      this.matDialog.open(ReusableDialogComponent, {
        height: '400px',
        width: '500px',
        data: {
          downTheRa8bitHole: true,
          mynft: this.currentNftDetais,
          parrentA: this.currentNftDetais.token_id,
          parrentB: this.OtherNft.NftId, tier: 0,
          nftAddress: this.OtherNft.OwnerWalletAddress,
          isPlaying: true,
          waitForPartnerTime: this.waitForPartnerTime,
          breedingTime:this.breedingTime
        }
      })
    } catch (e: any) {

    }

  }

}