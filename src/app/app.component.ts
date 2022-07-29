import { Component, OnInit } from '@angular/core';
import { ConnetmetamaskService } from './core/services/metamask/connetmetamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ra8bitsBreed';
  showSuccessDialog :boolean = false;
  successMessage :any ='';
  errorMessage :any = '';
  errorMessagedialog : boolean = false;

  constructor(private metamask:ConnetmetamaskService){
    metamask.isLogedin.subscribe(
      (data :any)=>{
        if(data.status){
          this.showSuccessDialog = true;
          this.successMessage = data.message;
          setTimeout(()=>{this.showSuccessDialog = false},2000);
        }

      }
    );
    
      metamask.isError.subscribe(
        (res:any)=>{
          this.errorMessagedialog = true;
          this.errorMessage = res.message;
          setTimeout(()=>{this.errorMessagedialog = false},2000);
        }
      )

  }
  ngOnInit(): void {
    this.metamask.disconnectWallet()
    this.metamask.networkChange()
  }

}
