import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../../core/services/dataservice/data.service';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', './../nft-detail/nft-detail.component.scss']
})
export class ProfileComponent implements OnInit {
  profileNftid :any;
  ownwnerWallet :any;
  nftCards :any = [];
  isConnected=false;
  currentNftDetais: any;
  constructor(private route: ActivatedRoute,
    private dataservice:DataService,
    private metamask:ConnetmetamaskService,private storage:LocalStorageService) { }

  ngOnInit(): void {
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');
    this.metamask. getWalletObs().subscribe((data: any) => {
      if(this.metamask.isAddressValid(data))
      {
        this.isConnected=true;
        this.ownwnerWallet = data;
        if(this.profileNftid>=0){
        this.getNftDetails();
      }
      }
      else
      {
        this.isConnected = false;
      }
  });     
   this.route.queryParams.subscribe(
      (res:any)=>{
        
        this.profileNftid = res.nft;
        if(this.isConnected){
          this.getNftDetails();

        }
      }
    )
  }

   getNftDetails() {

    var contractAddress = environment.ContactAddress;
    const url =
    'https://deep-index.moralis.io/api/v2/nft/'+
    contractAddress+'/'+
    this.profileNftid+'?chain=bsc%20testnet&format=decimal';
     this.dataservice.Moralis(url).subscribe(
      (res: any) => {
        this.nftCards = res;
          this.dataservice
            .getRequestWithoutHeader(res.token_uri)
            .subscribe((response: any) => {
              this.nftCards.details = response;
        });

        console.log('========>', this.nftCards);
      },
      (err) => {
        console.log(err);
      }
    );
  }




}
