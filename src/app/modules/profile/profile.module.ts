import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileCommonComponent } from './profile-common/profile-common.component';
import { CommonComponentModule } from 'src/app/common-component/common-component.module';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCommonComponent,
    
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CommonComponentModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
