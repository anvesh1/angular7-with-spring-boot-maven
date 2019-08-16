import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ChangePassComponent } from './change-pass/change-pass.component';

import { NotifyUserComponent } from './notify-user/notify-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    ChangePassComponent,
    NotifyUserComponent,
    UserListComponent,
    UserDetailsComponent,
    AddUserComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
