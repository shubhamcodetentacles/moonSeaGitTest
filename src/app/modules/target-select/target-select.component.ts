import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/dataservice/data.service';

@Component({
  selector: 'app-target-select',
  templateUrl: './target-select.component.html',
  styleUrls: ['./target-select.component.scss']
})
export class TargetSelectComponent implements OnInit {
  yourNft01 :any = {};
  OtherNft :any = {};
  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.yourNft01 = JSON.parse(sessionStorage.getItem('myNFT') || '');
    this.OtherNft = JSON.parse(sessionStorage .getItem('selectURBreeding') || '');
    this.getYourNftDetails();
    // console.log("this.yourNft ==>",this.yourNft01);
    console.log("this.OtherNft ==>",this.OtherNft);
  }

  getYourNftDetails(){
    this.data.getRequestWithoutHeader(this.yourNft01.token_uri).subscribe(
      (data :any)=>{
        this.yourNft01.details = data;
        console.log("token uri ===>", this.yourNft01);
      }
    )
  }

}
