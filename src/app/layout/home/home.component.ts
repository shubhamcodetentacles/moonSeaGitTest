import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';
import { LocalStorageService } from '../../core/services/dataservice/local-storage.service';
import { DataService } from '../../core/services/dataservice/data.service';

function _window() {
  return window;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentAddress: any;
  isConnected = false;
  constructor(
    private metamask: ConnetmetamaskService,
    private router: Router, private spiner: NgxSpinnerService,
    private localStorage: LocalStorageService,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.spiner.show();
    let isConnected = localStorage.getItem("wallet") ?? "0";
    this.metamask.getWalletObs().subscribe((data: any) => {
      if(this.metamask.isAddressValid(data))
      {
        this.isConnected=true;
        localStorage.setItem('address' , data)
        this.currentAddress = data;
        this.spiner.hide();
      }
      else
      {
        this.isConnected = false;
        // localStorage.removeItem('address')
        // this.spiner.hide();
      }
    });

    if (isConnected) {
      this.connetMetamask();
    }

  }
  get nativeWindow(): any {
    return _window();
  }
  gotoNftSelect() {
    this.router.navigate(['/nft-selectt']);
  }
  async connetMetamask() {
    this.metamask.connectAccountMetamask();
  }

  async withdrawalNft(){
    let spliSign = await this.metamask.test();
    spliSign.v,spliSign.r,spliSign.s
    debugger
    this.metamask.withdrawalNft(1);
  }
}
