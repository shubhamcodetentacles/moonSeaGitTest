import { Component, OnInit, Input } from '@angular/core';
import { ConnetmetamaskService } from 'src/app/core/services/metamask/connetmetamask.service';
import { LocalStorageService } from 'src/app/core/services/dataservice/local-storage.service';
import { DataService } from 'src/app/core/services/dataservice/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-super-like',
  templateUrl: './super-like.component.html',
  styleUrls: ['./super-like.component.scss']
})
export class SuperLikeComponent implements OnInit {
@Input() toNFTId:any;
@Input() NftAddress:any;
@Input() hideLikeButton:any
  currentNftDetais: any;
  isConnected=false;
  ownwnerWallet: any;

  constructor(private metamask:ConnetmetamaskService,
    private storage:LocalStorageService,
    private Dataservice: DataService) { }

  ngOnInit(): void {
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');
    this.metamask. getWalletObs().subscribe((data: any) => {
      if(this.metamask.isAddressValid(data))
      {
        this.isConnected=true;
        this.ownwnerWallet = data;
      }
      else
      {
        this.isConnected = false;
      }
  });  
  }

  async like() {
    console.log("sai")
    this.saveApi(this.toNFTId, 1,'Like to NFT id ' + this.toNFTId);
  }

  async superLike()
  {
    let amount = await this.metamask.getSuperLikeCost();
    if(!await this.metamask.checkAllowance(environment.ra8BitsToken,amount))
    {
      let approveTxn:any = await this.metamask.approveToken(amount,environment.ra8BitsToken);
      await approveTxn.hash.wait(3);
    }
    // let txn = await this.metamask.superLike(this.currentNftDetais.token_id,this.toNFTId,this.NftAddress);
    // await txn.wait(3);
    this.metamask.alertSuccess(true,"Super liked");

  }

  dislike()
  {
    
    this.saveApi(this.toNFTId, 2,'DisLike to NFT id ' + this.toNFTId);
  }

  async saveApi(nftid: any, likestatus :any,signatureMessage:string) {
    var signature: any = await this.metamask.signMessage(signatureMessage);

    let url = 'user/likeSave';
    let data = {
      fromNftId:this.currentNftDetais.token_id,
      toNftId: nftid,
      fromAddress: this.ownwnerWallet,
      Status: likestatus,
      Signature: signature.signature,
    };
    this.Dataservice.postRequest(url, data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.metamask.alertSuccess(true,res.message);
          // this.gotoYourMatch(slide);
        } else {
          this.metamask.alertError(res.message);
          // alert(res.message);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
