import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedOutcomeComponent } from './breed-outcome.component';

const routes: Routes = [
  { path: '', component: BreedOutcomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedOutcomeRoutingModule { }
