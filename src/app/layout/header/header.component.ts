import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnetmetamaskService } from 'src/app/core/services/metamask/connetmetamask.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private matamask:ConnetmetamaskService,private router :Router) { }

  ngOnInit(): void {
    this.matamask.connectAccountMetamask();
  }
  
}
