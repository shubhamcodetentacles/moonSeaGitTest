import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetSelectRoutingModule } from './target-select-routing.module';
import { TargetSelectComponent } from './target-select.component';


@NgModule({
  declarations: [
    TargetSelectComponent
  ],
  imports: [
    CommonModule,
    TargetSelectRoutingModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class TargetSelectModule { }
