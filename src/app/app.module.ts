import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/Login/login.component';
import { LoadingComponent } from './_components/Loading/loading.component';

import { LoadingService } from './_services/Loading/loading.service';
import { AlertService } from './_services/Alert/alert.service';

import { RoutingModule } from './_modules/Routing/routing.module';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { RegisterComponent } from './_components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    MainPageComponent,
    AlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [
    AlertService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
