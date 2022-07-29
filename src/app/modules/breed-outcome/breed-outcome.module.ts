import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedOutcomeRoutingModule } from './breed-outcome-routing.module';
import { BreedOutcomeComponent } from './breed-outcome.component';


@NgModule({
  declarations: [
    BreedOutcomeComponent
  ],
  imports: [
    CommonModule,
    BreedOutcomeRoutingModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class BreedOutcomeModule { }
