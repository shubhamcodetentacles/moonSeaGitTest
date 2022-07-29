import { Component, OnInit } from '@angular/core';
import { ConnetmetamaskService } from 'src/app/core/services/metamask/connetmetamask.service';

@Component({
  selector: 'app-b-inprogress-list',
  templateUrl: './b-inprogress-list.component.html',
  styleUrls: ['./b-inprogress-list.component.scss']
})
export class BInprogressListComponent implements OnInit {
  nftCard:any
  day: any = "00";
  hour: any= "00"
  minute: any="00"
  second: any="00"
  isClaim = false
  constructor(private metamask:ConnetmetamaskService) { }

  ngOnInit(): void {
    this.nftCard = [
      {},
      {},
      {},
      {},
      {},
      {},
    ]
    this.waitingTimeConvert(5) 
  }
  waitingForBreeding(){

  }
  cliamNft(){
    this.metamask.withdrawalNft(1)
  }
  waitingTimeConvert(seconds:any) {
    var interval = setInterval(() => {
      let dayTime = (60 * 60 * 24)
      this.day = Math.floor(seconds / dayTime)
      let rmainingTime = (seconds - (dayTime * this.day));
      let hoursTime = (60 * 60);
      this.hour = Math.floor(rmainingTime / (hoursTime))
      rmainingTime = (rmainingTime - (hoursTime * this.hour));
      let minTime = 60;
      this.minute = Math.floor(rmainingTime / minTime)
      rmainingTime = (rmainingTime - (minTime * this.minute));
      this.second = Math.floor(rmainingTime)
      seconds--;
      console.log('Day - ' + this.day + ', Hours - ' + this.hour + ', Minutes - ' + this.minute + ', Seconds - ' + this.second);
      if (seconds <= 0) {
        clearInterval(interval)
        this.isClaim = true
      }
    }, 1000);
  }
  
}
