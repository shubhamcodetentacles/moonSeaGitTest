import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BInprogrssRoutingModule } from './b-inprogrss-routing.module';
import { BInprogrssComponent } from './b-inprogrss.component';
import { TraitBiasDialogComponent } from './trait-bias-dialog/trait-bias-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BInprogrssComponent,
    TraitBiasDialogComponent,

  ],
  imports: [
    CommonModule,
    BInprogrssRoutingModule,
    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class BInprogrssModule { }
