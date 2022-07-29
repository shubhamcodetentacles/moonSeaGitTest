import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperPowersRoutingModule } from './super-powers-routing.module';
import { SuperPowersComponent } from './super-powers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SuperPowersComponent
  ],
  imports: [
    CommonModule,
    SuperPowersRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class SuperPowersModule { }
