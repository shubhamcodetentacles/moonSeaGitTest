import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import {MatDialog} from '@angular/material/dialog';
import { TraitBiasDialogComponent } from './trait-bias-dialog/trait-bias-dialog.component';
@Component({
  selector: 'app-b-inprogrss',
  templateUrl: './b-inprogrss.component.html',
  styleUrls: ['./b-inprogrss.component.scss']
})
export class BInprogrssComponent implements OnInit {

 public nftProgress:any = [];
 public value:any = 0
 public isVisible: boolean = true;
 public defaultImage = 'assets/lazyLoading.gif'
  constructor(private route :ActivatedRoute , private metamask:ConnetmetamaskService , private router :Router ,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
     this.nftProgress.push(res)
    })
    let startDate = new Date('2022-03-24 12:10:00').getTime()
   let endDate = new Date('2022-03-25 18:49:10').getTime()
   let currentDate = new Date()
   let cd = moment(currentDate).format('YYYY-MM-DD HH:mm:ss') 
   let currentOfDate = new Date(cd).getTime()
  var startOfDate =  moment(startDate),
  endOfDate =  moment(endDate),
  todayDate =  moment(currentOfDate);
   const daysDifference = moment(endOfDate).diff(startOfDate, 'milliseconds');
   const difference = todayDate.diff(startOfDate, 'milliseconds');

   const result = Math.round((difference / daysDifference) * 100);
   if(result<=100){
    this.value = result
   }else{
     this.isVisible = false
   }
   console.log({result})

  //  let date_future:any = new Date(endDate)
  //  let date_now:any =  new Date().getTime()
  //  var delta = Math.abs(date_future - date_now) / 1000;

  //  // calculate (and subtract) whole days
  //  var days = Math.floor(delta / 86400);
  //  delta -= days * 86400;
  //   console.log('=======>Days',days);

  //  // calculate (and subtract) whole hours
  //  var hours = Math.floor(delta / 3600) % 24;
  //  delta -= hours * 3600;
  //  console.log('=======>hours',hours);

  //  // calculate (and subtract) whole minutes
  //  var minutes = Math.floor(delta / 60) % 60;
  //  delta -= minutes * 60;
  //  console.log('=======>minuts',minutes);

  //  // what's left is seconds
  //  var seconds = delta % 60;
  //  console.log('=======>seconds',seconds);
  }
  superPower(item:any){
       //success res disable super power button
       this.router.navigate(['/super-powers',{...item}])
  }

  traitsBias(){
    this.dialog.open(TraitBiasDialogComponent,{
     height:'200px',
     width:'400px',
    })
    //success res disable super power button
    // try{
    //   let txn = this.metamask.SendTokenToBreeding("_breedId" ,"tokenId").then(res=>{
    //     res
    //   }).catch(e=>{
          
    //   })

    //   console.log(txn);
      
    //  }catch(e:any){

    //  }
    
  }
  collectNft(){
    this.metamask.claimNft('_breedId')
  }
}
