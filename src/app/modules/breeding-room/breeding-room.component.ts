import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';

@Component({
  selector: 'app-breeding-room',
  templateUrl: './breeding-room.component.html',
  styleUrls: ['./breeding-room.component.scss']
})
export class BreedingRoomComponent implements OnInit {

  nftCard = [
    {imgPath:'assets/lazyLoading.gif' , description: "Welcome to code" , name:'Ajay'},
    {imgPath:'assets/lazyLoading.gif' , description: "Welcome to code" , name:'Ajay'},
    {imgPath:'assets/lazyLoading.gif' , description: "Welcome to code" , name:'Ajay'}
  ]
  defaultImage = 'assets/lazyLoading.gif'
  gridColumns = 3;
  active = 0
  constructor(private router : Router , private metamask:ConnetmetamaskService) { }
  

  ngOnInit(): void {
  }
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  onTabChange(e:any){
    console.log(e);
    
  }
  gotoBinprogress(item:any){
     this.router.navigate(['/b-inprogress', {...item}])
  }
  gotoProfile(nftid:any){
    this.router.navigate(['/profile'],{ queryParams: { nft: 10904 } })
  }
  downTheRa8bithole(){
      try{
        this.metamask.sendToBreedingRoomSecond("tier","_breedId","NFTAddress",true)
      }catch(e:any){
         
      }
  }
}
