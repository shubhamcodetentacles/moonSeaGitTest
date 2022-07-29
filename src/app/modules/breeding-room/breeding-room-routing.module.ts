import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedingRoomComponent } from './breeding-room.component';

const routes: Routes = [
  { path:'',component:BreedingRoomComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedingRoomRoutingModule { }
