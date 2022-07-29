import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BInprogressListRoutingModule } from './b-inprogress-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BInprogressListComponent } from './b-inprogress-list.component';


@NgModule({
  declarations: [
    BInprogressListComponent
  ],
  imports: [
    CommonModule,
    BInprogressListRoutingModule,
    SharedModule
  ]
})
export class BInprogressListModule { }
