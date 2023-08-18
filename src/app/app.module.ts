import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupDetailsComponent } from './usergroup/usergroup-details/usergroup-details.component';
import { UsergroupListComponent } from './usergroup/usergroup-list/usergroup-list.component';
import { UsergroupEditComponent } from './usergroup/usergroup-edit/usergroup-edit.component';
import { GamingeventComponent } from './gamingevent/gamingevent.component';
import { GamingeventDetailsComponent } from './gamingevent/gamingevent-details/gamingevent-details.component';
import { GamingeventListComponent } from './gamingevent/gamingevent-list/gamingevent-list.component';
import { GamingeventEditComponent } from './gamingevent/gamingevent-edit/gamingevent-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AddUserDetailsInterceptor } from './interceptors/addUserDetails.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserLoginComponent,
    UserRegisterComponent,
    NavigationComponent,
    UsergroupComponent,
    UsergroupDetailsComponent,
    UsergroupListComponent,
    UsergroupEditComponent,
    GamingeventComponent,
    GamingeventDetailsComponent,
    GamingeventListComponent,
    GamingeventEditComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddUserDetailsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
