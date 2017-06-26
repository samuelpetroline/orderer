import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../_guards/auth.guard';
import { MainPageComponent } from '../../_components/main-page/main-page.component';
import { DashboardComponent } from '../../_components/dashboard/dashboard.component';
import { OrdersComponent } from '../../_components/orders/orders.component';
import { ProductsComponent } from '../../_components/products/products.component';
import { ProductListComponent } from '../../_components/product-list/product-list.component';
import { ProductDetailsComponent } from '../../_components/product-details/product-details.component';
import { ProductRegisterComponent } from '../../_components/product-register/product-register.component';
import { CartComponent } from '../../_components/cart/cart.component';
import { SettingsComponent } from '../../_components/settings/settings.component';
import { OrderListComponent } from '../../_components/order-list/order-list.component';
import { OrderDetailsComponent } from '../../_components/order-details/order-details.component';

const mainPageRoutes: Routes = 
[
  {        
        path: 'main',
        component: MainPageComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                pathMatch: 'full',
                component: DashboardComponent
            },
            {
                path: 'orders',
                component: OrdersComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'order-list'
                    },
                    {
                        path: 'order-list',
                        component: OrderListComponent
                    },
                    {
                        path: 'order-details/:id',
                        component: OrderDetailsComponent
                    }
                ]
            },
            {
                path: 'products',
                component: ProductsComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'product-list'                        
                    },  
                    {
                        path: 'product-list',
                        component: ProductListComponent
                    },
                    {
                        path: 'product-details/:id',
                        component: ProductDetailsComponent              
                    },
                    {
                        path: 'product-register',
                        component: ProductRegisterComponent              
                    },
                    {
                        path: 'product-register/:id',
                        component: ProductRegisterComponent              
                    }       
                ]
            },           
            {
                path: 'cart',
                pathMatch: 'full',
                component: CartComponent
            },
            {
                path: 'settings',
                pathMatch: 'full',
                component: SettingsComponent
            }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainPageRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class MainPageRoutingModule  { }
