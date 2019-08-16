import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotifyUserComponent } from './notify-user/notify-user.component'
import { AddUserComponent } from './add-user/add-user.component'


const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'change-password',
    component: ChangePassComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user-details',
    component: UserDetailsComponent
  },
    {
    path: 'notify-user',
    component: NotifyUserComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  { 
    path: '**', component:LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
