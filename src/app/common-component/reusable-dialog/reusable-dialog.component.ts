import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from 'src/app/core/services/dataservice/data.service';
import { ConnetmetamaskService } from 'src/app/core/services/metamask/connetmetamask.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reusable-dialog',
  templateUrl: './reusable-dialog.component.html',
  styleUrls: ['./reusable-dialog.component.scss']
})
export class ReusableDialogComponent implements OnInit {
  dt: any;
  value = false;
  defaultImage= 'assets/siteimage/image-not-found.jpg'
  day: any = "00";
  hour: any= "00"
  minute: any="00"
  second: any="00"
  constructor(public dialogRef: MatDialogRef<ReusableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private matData: DataService, private metamask: ConnetmetamaskService) {
    }

  ngOnInit(): void {
    this.matData.matDialogData$.subscribe((res: any) => {
      this.dt = res.data

    })
    if (this.data.downTheRa8bitHole) {
      this.value = this.data
    }
   if(this.data.waitForPartnerTime!=undefined){
     this.waitForPartnerTimeConvert(this.data.waitForPartnerTime)

   }
   if(this.data.breedingTime!=undefined){
    //  this.convertTime(this.data.breedingTime)
   }
  }
  async sendToBreedingRoom() {
    try {

      let amount = await this.metamask.calculateCost(this.data.parrentA, this.data.parrentB, this.data.tier,  this.data.isPlaying)
      let tx=await  this.metamask.checkAllowance(environment.ra8BitsToken, amount)
      if(!tx)
      {
        let approveTxn: any = await this.metamask.approveToken(amount, environment.ra8BitsToken)
        await approveTxn.hash.wait(2)
      }
      let checkApproval= await this.metamask.checkApproval();
      if(!checkApproval)
      {
        let approve: any = await this.metamask.approve();
        await approve.hash.wait(2)
      }
      // await this.metamask.sendToBreedingRoomFirst(this.data.parrentA, this.data.parrentB, this.data.tier, this.data.nftAddress, this.data.isPlaying)
      await this.metamask.sendToBreedingRoomFirst(this.data.parrentA, this.data.parrentB, this.data.tier, environment.ContactAddress, this.data.isPlaying)

    } catch (e: any) {
      this.metamask.alertError(e.data.message)
    }
  }
  waitForPartnerTimeConvert(seconds: any) {
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
      // console.log('Day - ' + this.day + ', Hours - ' + this.hour + ', Minutes - ' + this.minute + ', Seconds - ' + this.second);
      if (seconds <= 0) {
        clearInterval(interval)
      }
    }, 1000);
  }
  // breedingTime(seconds: any) {
  //   var interval = setInterval(() => {
  //     let dayTime = (60 * 60 * 24)
  //     this.day = Math.floor(seconds / dayTime)
  //     let rmainingTime = (seconds - (dayTime * this.day));
  //     let hoursTime = (60 * 60);
  //     this.hour = Math.floor(rmainingTime / (hoursTime))
  //     rmainingTime = (rmainingTime - (hoursTime * this.hour));
  //     let minTime = 60;
  //     this.minute = Math.floor(rmainingTime / minTime)
  //     rmainingTime = (rmainingTime - (minTime * this.minute));
  //     this.second = Math.floor(rmainingTime)
  //     seconds--;
  //     console.log('Day - ' + this.day + ', Hours - ' + this.hour + ', Minutes - ' + this.minute + ', Seconds - ' + this.second);
  //   }, 1000);
  //   if (seconds <= 0) {
  //     clearInterval(interval)
  //   }
  // }
}
