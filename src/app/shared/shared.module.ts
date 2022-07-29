import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDialogModule} from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout'
import {LazyLoadImageModule , LAZYLOAD_IMAGE_HOOKS , ScrollHooks} from 'ng-lazyload-image';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule, MatButtonModule, MatCardModule,MatDividerModule,MatProgressBarModule,MatDialogModule,
    FlexLayoutModule,
    SwiperModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    MatTabsModule,
    MatIconModule,
    MatButtonModule, 
    MatCardModule,
    MatDividerModule,MatDividerModule,MatProgressBarModule,MatDialogModule,
    FlexLayoutModule,
    LazyLoadImageModule,
    SwiperModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [{provide:LAZYLOAD_IMAGE_HOOKS,useClass:ScrollHooks}],

})
export class SharedModule { }
