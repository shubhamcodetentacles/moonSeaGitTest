import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchComponent } from './match.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonComponentModule } from 'src/app/common-component/common-component.module';


@NgModule({
  declarations: [
    MatchComponent
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    SharedModule,
    CommonComponentModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class MatchModule { }
