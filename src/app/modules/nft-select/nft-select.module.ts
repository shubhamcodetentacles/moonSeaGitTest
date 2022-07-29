import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftSelectRoutingModule } from './nft-select-routing.module';
import { NftSelectComponent } from './nft-select.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NftSelectComponent
  ],
  imports: [
    CommonModule,
    NftSelectRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class NftSelectModule { }
