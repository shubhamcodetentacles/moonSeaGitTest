import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperLikeComponent } from './super-like/super-like.component';
import { ReusableDialogComponent } from './reusable-dialog/reusable-dialog.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SuperLikeComponent,
    ReusableDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[SuperLikeComponent ,ReusableDialogComponent]
})
export class CommonComponentModule { }
