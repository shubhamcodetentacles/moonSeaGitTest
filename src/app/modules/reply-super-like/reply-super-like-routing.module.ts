import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from 'src/app/core/guard/route.guard';
import { ReplySuperLikeComponent } from './reply-super-like.component';

const routes: Routes = [
  { path: '', component: ReplySuperLikeComponent , canActivate:[RouteGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplySuperLikeRoutingModule { }
