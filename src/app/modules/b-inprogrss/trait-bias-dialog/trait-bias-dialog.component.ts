import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/dataservice/local-storage.service';
import { ConnetmetamaskService } from 'src/app/core/services/metamask/connetmetamask.service';

@Component({
  selector: 'app-trait-bias-dialog',
  templateUrl: './trait-bias-dialog.component.html',
  styleUrls: ['./trait-bias-dialog.component.scss']
})
export class TraitBiasDialogComponent implements OnInit {
  currentNftDetais: any;
  data:any
  constructor(private metamask:ConnetmetamaskService,private storage:LocalStorageService) { }

  ngOnInit(): void {
    this.currentNftDetais = JSON.parse(this.storage.retrieve('myNFT') || '{}');
    try{
        let txn = this.metamask.TokenListForBreedingInfo('1').then(res=>{
        this.data = res
          
        }).catch(e=>{
            console.log(e);
            
        })
        console.log(this.data);
       
        console.log(txn);
        
       }catch(e:any){
  
       }
  }

}
