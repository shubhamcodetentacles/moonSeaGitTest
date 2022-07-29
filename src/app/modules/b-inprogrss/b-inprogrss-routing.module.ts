import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BInprogrssComponent } from './b-inprogrss.component';

const routes: Routes = [
  { path: '', component: BInprogrssComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BInprogrssRoutingModule { }
