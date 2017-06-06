import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../_guards/auth.guard';
import { LoginComponent } from '../../_components/Login/login.component';
import { RegisterComponent } from '../../_components/register/register.component';
import { MainPageComponent } from '../../_components/main-page/main-page.component';
import { MainPageRoutingModule } from './main-page.module';

const routes: Routes = 
[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent    
  },
  {
    path: 'main',
    component: MainPageComponent
    //canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MainPageRoutingModule
  ],
  exports: [RouterModule],
  declarations: []
})

export class RoutingModule { }
