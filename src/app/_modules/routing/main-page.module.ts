import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../_guards/auth.guard';
import { MainPageComponent } from '../../_components/main-page/main-page.component';
import { DashboardComponent } from '../../_components/dashboard/dashboard.component';
import { OrdersComponent } from '../../_components/orders/orders.component';
import { ProductsComponent } from '../../_components/products/products.component';
import { ProductDetailsComponent } from '../../_components/product-details/product-details.component';
import { StoresComponent } from '../../_components/stores/stores.component';
import { SettingsComponent } from '../../_components/settings/settings.component';

const mainPageRoutes: Routes = 
[
  {        
        path: 'main',
        component: MainPageComponent,
        //canActivate: [AuthGuard],
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
              pathMatch: 'full',
              component: OrdersComponent
          },
          {
              path: 'products',
              pathMatch: 'full',
              component: ProductsComponent              
          },
          {
              path: 'products/:id',
              component: ProductDetailsComponent              
          },      
          {
              path: 'stores',
              pathMatch: 'full',
              component: StoresComponent
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
