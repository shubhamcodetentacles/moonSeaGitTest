import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BInprogressListComponent } from './b-inprogress-list.component';

const routes: Routes = [
  {path:'' , component:BInprogressListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BInprogressListRoutingModule { }
