import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppConfig } from './app.config';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/Login/login.component';
import { LoadingComponent } from './_components/Loading/loading.component';

import { BaseService } from './_services/base.service';
import { LoadingService } from './_services/Loading/loading.service';
import { AlertService } from './_services/Alert/alert.service';
import { AuthenticationService } from './_services/Authentication/authentication.service';
import { UserService } from './_services/User/user.service';
import { CepService } from './_services/Cep/cep.service';
import { OrderService } from './_services/Order/order.service';
import { DashboardService } from './_services/Dashboard/dashboard.service';

import { AuthGuard } from './_guards/auth.guard';

import { RoutingModule } from './_modules/Routing/routing.module';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { RegisterComponent } from './_components/register/register.component';
import { MenuComponent } from './_components/menu/menu.component';
import { OrdersComponent } from './_components/orders/orders.component';
import { ProductsComponent } from './_components/products/products.component';
import { SettingsComponent } from './_components/settings/settings.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { CardComponent } from './_components/card/card.component';
import { ProductDetailsComponent } from './_components/product-details/product-details.component';
import { EqualValidator } from './_directives/validator/validator.directive';
import { MaskValidatorDirective } from './_directives/mask-validator/mask-validator.directive';
import { SafeHtml } from './_pipes/SafeHTML/safe-html.pipe';
import { ProductRegisterComponent } from './_components/product-register/product-register.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { FilterListPipe } from './_pipes/FilterList/filter-list.pipe';
import { OrderListComponent } from './_components/order-list/order-list.component';
import { OrderDetailsComponent } from './_components/order-details/order-details.component';
import { CartComponent } from './_components/cart/cart.component';

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
    SettingsComponent,
    CardComponent,
    ProductDetailsComponent,
    EqualValidator,
    MaskValidatorDirective,
    SafeHtml,
    ProductRegisterComponent,
    ProductListComponent,
    FilterListPipe,
    OrderListComponent,
    OrderDetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    ChartsModule
  ],
  providers: [
    AlertService,
    LoadingService,
    AuthGuard,
    AuthenticationService,
    UserService,
    CepService,
    OrderService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
