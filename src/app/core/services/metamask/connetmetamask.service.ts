import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ethers } from 'ethers';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DisconnectModelComponent } from 'src/app/layout/disconnect-model/disconnect-model.component';
import { environment } from 'src/environments/environment';

function _window() {
  return window;
}

const tokenAbi = require('../../../../assets/abis/ratbitsToken.json');
const breedingAbi = require('../../../../assets/abis/breeding.json');
const nftAbi = require('../../../../assets/abis/nft.json');



@Injectable({
  providedIn: 'root',
})
export class ConnetmetamaskService {
  provider: any;
  signer: any;
  userAddress : any;
  isLogedin = new Subject();
  isError = new Subject();
  address = '';
  private  walletDetails$: BehaviorSubject<any> = new BehaviorSubject(null);
  tokenContract!:ethers.Contract;
  breedingContract!:ethers.Contract;
  nftContract!:ethers.Contract;

  constructor(private router: Router , private disconnect:MatDialog) {}

  get nativeWindow(): any {
    return _window();
  }

  getWalletObs(): Observable<any> {

    return this.walletDetails$.asObservable();
  }

  setWalletObs(profile: any) {

    this.userAddress = profile;
    this.walletDetails$.next(profile);
  }

  alertSuccess(status : boolean,message :any){
    this.isLogedin.next({"status":status,"message":message});
  }

  alertError(message :any){
    this.isError.next({"message":message});
  }


  async connectAccountMetamask() {
    if (this.nativeWindow.ethereum !== undefined) {
      await this.nativeWindow.ethereum.request({
        method: 'eth_requestAccounts',
      });

      this.provider = new ethers.providers.Web3Provider(
        this.nativeWindow.ethereum
      );

      this.address = await this.getAccountAddress();

      sessionStorage.setItem('wallet', "1");
      this.setWalletObs(this.address);
    }
  }
  async disconnectWallet(){
   await this.nativeWindow.ethereum.on('accountsChanged', (accounts:any) => {

    localStorage.clear()
    sessionStorage.clear()
     if(accounts.length===0){
      this.alertError('Account has beed disconnected')
      this.router.navigate(['/'])
   }else if(this.router.url!=='/home'){

    this.disconnect.open(DisconnectModelComponent,
      {
        width:'300px',
        height:'300px',
        data:{isWalletChange:true}
    })
   }

  });

  }
async networkChange(){
  await this.nativeWindow.ethereum.on('chainChanged', (networkId:any) => {

   let nid = parseInt(networkId , 16).toString()
    let id = environment.chainId.toString()
    if(nid!==id){
      this.disconnect.open(DisconnectModelComponent,
        {
          width:'300px',
          height:'300px',
          data:{isNetworkChange:true}
      })
    }

    if(nid==id){
      this.disconnect.closeAll()
    }
  })
}
  async getAccountAddress() {
    this.signer = this.provider.getSigner();
    var address = await this.signer.getAddress();
    var network = await this.provider.getNetwork();
    if (network.chainId == 97) {
      this.tokenContract = new ethers.Contract(environment.ra8BitsToken, tokenAbi, this.signer);
      this.breedingContract = new ethers.Contract(environment.breedinAddress, breedingAbi, this.signer);
      this.nftContract = new ethers.Contract(environment.ContactAddress, nftAbi, this.signer);
    }
    var data = {
      'provider': this.provider,
      'signer': this.signer,
      'address': address,
      'networkId': network,
    }
    return address;
  }

async superLikeSign(fromId:number,FromNftAddress:string,toNftId:number,toNftAddress:string,signature:string ,amount:number,salt:number){
  let params: any = ethers.utils.parseEther(amount.toString());
  const spliSign = ethers.utils.splitSignature(signature);
  let cost = params.toString()
  const promise = new Promise((resolve, reject)=>{
    try {

        this.breedingContract.superLikeNFT(fromId,FromNftAddress,toNftId,toNftAddress,salt,spliSign.v,spliSign.r,spliSign.s).then((transactionHash: any) => {
        resolve({ hash: transactionHash.hash, status: true });
      }).catch((e: any) => {
        reject({ hash: e, status: false });
      });
     }catch(e:any){
      reject({ hash: '', status: false });
     }
  })
  return promise
}


  async signMessage(message: any) {
     var signature = await this.signer.signMessage(message);
      return { status: true, signature };
  }

  isAddressValid(address:any)
  {
    return ethers.utils.isAddress(address);
  }

  async superLike(fromId:number,FromNftAddress:string ,toNftId:number,toNftAddress:string)
  {
    return await this.breedingContract.superLikeNFT(fromId,FromNftAddress,toNftId,toNftAddress);
  }

  async acceptSuperLike(fromNftId: number, formNftAddress: string, toNftId: number,toNftAddress:string) {

    return await this.breedingContract.acceptSuperLike(fromNftId, formNftAddress, toNftId,toNftAddress);
  }
  async sendTokensForSwiping(){
       return await this.breedingContract.sendTokensForSwiping()
  }
  async rejectSuperLike(fromNftId: number, formNftAddress: string, toNftId: number,toNftAddress:string) {
    return await this.breedingContract.rejectSuperLike(fromNftId, formNftAddress, toNftId,toNftAddress);
  }

  async claimPendingTokens(fromNftId: number, formNftAddress: string, toNftId: number,toNftAddress:string,signature:string) {
    const spliSign = ethers.utils.splitSignature(signature);
    return await this.breedingContract.claimPendingTokensFromSuperLike(fromNftId, formNftAddress, toNftId,toNftAddress,spliSign.v,spliSign.r,spliSign.s);
  }

  async getBreedingCost(fromId:number,toId:number,tier:any,isPlaying:boolean)
  {
    return await this.breedingContract.calculateCost(fromId,toId,tier , isPlaying);
  }

  async sendToBreedingRoomFirst(fromId:number,toId:number,tier:any,nftAddress:any, isPlaying:boolean)
  {
    return await this.breedingContract.sendToBreedingRoomFirst(fromId,toId,tier,nftAddress,isPlaying);
  }
  async calculateCost(fromId:number,toId:number,tier:any, isPlaying:boolean){
    return await this.breedingContract.calculateCost(fromId,toId,tier,isPlaying);
  }

async sendSpecialNft(_breedId:string ,specialNft:String,specialtANFTAddress:string){
  return await this.breedingContract.sendSpecialNft(_breedId,specialNft,specialtANFTAddress);
}
async TokenListForBreedingInfo(id:any){

  return await this.breedingContract.TokenListForBreedingInfo(id);
}
async sendToBreedingRoomSecond(tier:string,_breedId:String,NFTAddress:string,isPaying:boolean){
  return await this.breedingContract.sendToBreedingRoomSecond(tier,_breedId , NFTAddress , isPaying);
}
async tokenAmountForSwiping(){
  return await this.breedingContract.tokenAmountForSwiping()
}
async claimNft(_breedId:any){
  return await this.breedingContract.claimNft(_breedId)
}
async waitForPartnerTime(){
  return await this.breedingContract.waitForPartnerTime()
}
async breedingTime(){
return await this.breedingContract.breedingTime()
}
async withdrawalNft(breedId:any){
  return await this.breedingContract.withdrawalNft(breedId)
}
  async getTokenBalance(tokenAddress:any) {
    let tokenContract = new ethers.Contract(tokenAddress, tokenAbi, this.signer);
    let decimals = await tokenContract.decimals();
      try {
        var promise =await tokenContract.balanceOf(this.userAddress)
          return ({ balance: promise, status: true,decimals:decimals });
      }
      catch (e) {
        ;
        console.log(e)
        return ({ balance: 0, status: false,decimals:0 });
      }
  }

  async checkApproval()
  {
    return await this.nftContract.isApprovedForAll(this.userAddress,environment.breedinAddress);
  }

  async approve()
  {
    return await this.nftContract.setApprovalForAll(environment.breedinAddress,true);

  }

  async getSuperLikeCost()
  {

    return await this.breedingContract.costForSuperLike();
  }
 async tierList(){
   return await this.breedingContract.tierList(1)
 }
  async checkAllowance(tokenAddress:any,amount:any) {
    let tokenContract = new ethers.Contract(tokenAddress, tokenAbi, this.signer);
    let allowanceAmount =await tokenContract.allowance(this.userAddress, environment.breedinAddress);
        return allowanceAmount>=amount;
    }

  async approveToken(amount:any,tokenAddress:any)
  {
    let tokenContract = new ethers.Contract(tokenAddress, tokenAbi, this.signer);
    // let decimals = await tokenContract.decimals();
    // const params2 =(10**decimals)*amount;

    var promise = new Promise(async (resolve, reject) => {
      try {
        let tx =await tokenContract.approve(environment.breedinAddress, (amount).toString())
          resolve({hash:tx,status:true,allowance:false})
      }
      catch (e) {
        console.log(e)
        reject({ hash: e, status: false });
      }
    });
    return promise
  }

  test()
  {
   let spliSign = ethers.utils.splitSignature('0x51b23a8f8c25bb4138687060a146890c5d8003f4d2d38630b51e473acded201679179c94bccd33ee849343ddab9a1669914cff755bf7ac5c39082bea9aa1765f1c');
    return spliSign;
  }
}
