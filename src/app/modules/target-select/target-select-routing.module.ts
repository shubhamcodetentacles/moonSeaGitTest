import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetSelectComponent } from './target-select.component';

const routes: Routes = [
  { path: '', component: TargetSelectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetSelectRoutingModule { }
