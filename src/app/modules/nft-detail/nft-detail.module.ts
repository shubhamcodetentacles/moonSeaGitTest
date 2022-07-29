import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftDetailRoutingModule } from './nft-detail-routing.module';
import { NftDetailComponent } from './nft-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NftDetailComponent
  ],
  imports: [
    CommonModule,
    NftDetailRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class NftDetailModule { }
