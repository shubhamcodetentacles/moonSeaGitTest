import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplySuperLikeRoutingModule } from './reply-super-like-routing.module';
import { ReplySuperLikeComponent } from './reply-super-like.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReplySuperLikeComponent
  ],
  imports: [
    CommonModule,
    ReplySuperLikeRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class ReplySuperLikeModule { }
