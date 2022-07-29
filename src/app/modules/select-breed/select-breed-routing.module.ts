import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectBreedComponent } from './select-breed.component';
import { SelectedTargetComponent } from './selected-target/selected-target.component';

const routes: Routes = [
  { path: '', component: SelectBreedComponent },
  { path: 'selected-target', component: SelectedTargetComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectBreedRoutingModule { }
