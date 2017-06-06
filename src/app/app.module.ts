import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppConfig } from './app.config';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/Login/login.component';
import { LoadingComponent } from './_components/Loading/loading.component';

import { LoadingService } from './_services/Loading/loading.service';
import { AlertService } from './_services/Alert/alert.service';
import { AuthenticationService } from './_services/Authentication/authentication.service';

import { AuthGuard } from './_guards/auth.guard';

import { RoutingModule } from './_modules/Routing/routing.module';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { RegisterComponent } from './_components/register/register.component';
import { MenuComponent } from './_components/menu/menu.component';
import { OrdersComponent } from './_components/orders/orders.component';
import { ProductsComponent } from './_components/products/products.component';
import { StoresComponent } from './_components/stores/stores.component';
import { SettingsComponent } from './_components/settings/settings.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    MainPageComponent,
    AlertComponent,
    RegisterComponent,
    MenuComponent,
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    StoresComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [
    AppConfig,
    AlertService,
    LoadingService,
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
