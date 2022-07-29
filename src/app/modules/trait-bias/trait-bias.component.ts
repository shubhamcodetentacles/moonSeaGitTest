import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';

@Component({
  selector: 'app-trait-bias',
  templateUrl: './trait-bias.component.html',
  styleUrls: ['./trait-bias.component.scss']
})
export class TraitBiasComponent implements OnInit {

  constructor(private metamask:ConnetmetamaskService,private router:Router) { }

  ngOnInit(): void {
  }
  confirm(){
      try{
            this.metamask.sendSpecialNft('_breedId',"specialNft","specialtANFTAddress");
            //after success back to b-inprogress
             this.router.navigate(['/b-inprogress'])
      }catch(e:any){

      }
  }
}
