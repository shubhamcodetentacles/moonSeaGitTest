import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { SwiperModule } from 'swiper/angular';
import { ConnetmetamaskService } from './core/services/metamask/connetmetamask.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import {FlexLayoutModule} from '@angular/flex-layout'
import {LazyLoadImageModule , LAZYLOAD_IMAGE_HOOKS , ScrollHooks} from 'ng-lazyload-image';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DisconnectModelComponent } from './layout/disconnect-model/disconnect-model.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    // SuperLikeComponent,
    DisconnectModelComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    HammerModule,
    // SharedModule,
    FlexLayoutModule,
    LazyLoadImageModule,
    MatDialogModule,
    MatButtonModule
    ],
  providers: [ConnetmetamaskService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },{provide:LAZYLOAD_IMAGE_HOOKS,useClass:ScrollHooks}],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
