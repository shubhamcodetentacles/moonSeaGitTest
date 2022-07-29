import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedingRoomRoutingModule } from './breeding-room-routing.module';
import { BreedingRoomComponent } from './breeding-room.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BreedingRoomComponent
  ],
  imports: [
    CommonModule,
    BreedingRoomRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class BreedingRoomModule { }
