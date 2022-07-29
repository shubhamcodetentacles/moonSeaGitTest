import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnetmetamaskService } from '../../core/services/metamask/connetmetamask.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private router: Router, private metamask: ConnetmetamaskService,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let data = localStorage.getItem('address')
    let isConnected = localStorage.getItem("wallet") ?? "0";
    this.metamask.connectAccountMetamask();
    if (isConnected) {
      this.metamask.getWalletObs().subscribe((res: any) => {
        if (this.metamask.isAddressValid(res)) {
        }
      })

      return true
    } else {
      return false
    }


  }

}
