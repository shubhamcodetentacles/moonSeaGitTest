import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraitBiasRoutingModule } from './trait-bias-routing.module';
import { TraitBiasComponent } from './trait-bias.component';


@NgModule({
  declarations: [
     TraitBiasComponent
  ],
  imports: [
    CommonModule,
    TraitBiasRoutingModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class TraitBiasModule { }
