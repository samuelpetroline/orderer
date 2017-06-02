import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../_guards/auth.guard';
import { LoginComponent } from '../../_components/Login/login.component';
import { RegisterComponent } from '../../_components/register/register.component';
import { MainPageComponent } from '../../_components/main-page/main-page.component';

const routes: Routes = 
[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [AuthGuard]
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
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class RoutingModule { }
