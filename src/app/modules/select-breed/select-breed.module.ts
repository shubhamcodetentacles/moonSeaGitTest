import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectBreedRoutingModule } from './select-breed-routing.module';
import { SelectBreedComponent } from './select-breed.component';
import { SelectedTargetComponent } from './selected-target/selected-target.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SelectBreedComponent,
    SelectedTargetComponent,
  ],
  imports: [
    CommonModule,
    SelectBreedRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectBreedModule { }
