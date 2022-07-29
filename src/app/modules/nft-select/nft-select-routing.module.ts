import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from 'src/app/core/guard/route.guard';
import { NftSelectComponent } from './nft-select.component';

const routes: Routes = [
  {
    path: '',
    component: NftSelectComponent,
    canActivate:[RouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NftSelectRoutingModule { }
