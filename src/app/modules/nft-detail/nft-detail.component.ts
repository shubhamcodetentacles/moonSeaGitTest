import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/dataservice/data.service';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.scss']
})
export class NftDetailComponent implements OnInit {
  currentNftDetais: any = {};
  nickName: any;
  description: any;
  ownwnerWallet: any;
  btnText = "Submit"
  defaultImage = 'https://static.wixstatic.com/media/041af7_93cce9eb529d46cc90b10db5123acb36~mv2.png/v1/fit/w_800,h_525,q_90/041af7_93cce9eb529d46cc90b10db5123acb36~mv2.webp';
  nftMetadata: any;
  isConnected: boolean = false;
  currentNft: any;


  constructor(private dataservice: DataService, private router: Router,
    private metamask: ConnetmetamaskService,
    private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');

    this.metamask. getWalletObs().subscribe((data: any) => {
      if (this.metamask.isAddressValid(data)) {
        this.isConnected = true;
        this.ownwnerWallet = data;
        this.getNftDetails();
        this.getSelectedNFT();
        // this.spiner.hide();
      }
      else {
        this.isConnected = false;
        // this.spiner.hide();
      }
    });

  }

  getSelectedNFT() {
    this.nftMetadata = JSON.parse(this.storage.retrieve('myNFT') ?? "{}");
  }

  getNftDetails() {

    const url = "user/getNftDetails?nftId=" + this.currentNftDetais.nftid + "&connectedWalletAddress=" + this.ownwnerWallet;

    this.dataservice.getRequest(url).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.status == 200) {
          this.nickName = res.data.NickName;
          this.description = res.data.Description;
          this.currentNft = res.data;
        }
        else {
          this.currentNft = localStorage.getItem("myNFT")
        }
      }, (err) => {
        console.log(err);

      }
    )
  }


  async save() {
    try {
      const url = "User/updateProfile";
      this.btnText = "Waiting for signature.."
      let data: any = {
        "id": this.nftMetadata.token_id,
        "name": this.nickName,
        "image": this.currentNftDetais.imagePath,
        "OwnerWalletAddress": this.ownwnerWallet,
        "description": this.description,
        "nftAddress": this.nftMetadata.token_address
      };
  
      var signature: any = await this.metamask.signMessage(JSON.stringify(data));


      if (signature.status) {
        data.signature = signature.signature;
        this.btnText = "Submitting Data.."
        this.dataservice.postRequest(data,url).subscribe(
          (data: any) => {
            if (data.status == 200) {
              // alert("Successfully Updated ");  
              
              this.currentNftDetais.NickName = this.nickName;
              this.storage.store('myNFT', JSON.stringify(this.currentNftDetais));
              this.metamask.alertSuccess(true, 'Successfully Updated');
              this.router.navigate(['/select-breed']);
            }
            else {
              this.btnText = "Submit";
              alert(data.message);
            }
          }, (err) => {
            this.btnText = "Submit";
            console.log(err);
          }
        )
      } else {
        alert("Signature is required....")
      }
    }
    catch (e) {
      this.btnText = "Submit"
    }
  }
}
