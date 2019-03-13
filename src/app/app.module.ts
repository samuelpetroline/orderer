import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { LoadingComponent } from './_components/loading/loading.component';

import { LoadingService } from './_services/loading/loading.service';
import { AlertService } from './_services/alert/alert.service';
import { AuthenticationService } from './_services/authentication/authentication.service';
import { UserService } from './_services/user/user.service';
import { CepService } from './_services/cep/cep.service';
import { OrderService } from './_services/order/order.service';
import { DashboardService } from './_services/dashboard/dashboard.service';
import { ApiService } from './_services/api.service';

import { AuthGuard } from './_guards/auth.guard';

import { RoutingModule } from './_modules/routing/routing.module';
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
    HttpClientModule,
    RoutingModule,
    ChartsModule
  ],
  providers: [
    ApiService,
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
