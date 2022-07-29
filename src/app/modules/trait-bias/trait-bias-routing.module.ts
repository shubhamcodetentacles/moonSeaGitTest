import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from 'src/app/core/guard/route.guard';
import { TraitBiasComponent } from './trait-bias.component';

const routes: Routes = [
  { path: '', component: TraitBiasComponent , canActivate:[RouteGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraitBiasRoutingModule { }
