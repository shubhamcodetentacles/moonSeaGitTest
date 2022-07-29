import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperPowersComponent } from './super-powers.component';

const routes: Routes = [
  { path: '', component: SuperPowersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperPowersRoutingModule { }
