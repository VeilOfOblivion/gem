import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserComponent } from './user/user.component';
import { GamingeventComponent } from './gamingevent/gamingevent.component';
import { GamingeventEditComponent } from './gamingevent/gamingevent-edit/gamingevent-edit.component';
import { GamingeventDetailsComponent } from './gamingevent/gamingevent-details/gamingevent-details.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupEditComponent } from './usergroup/usergroup-edit/usergroup-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user', component: UserComponent },
  {
    path: 'events', component: GamingeventComponent, children: [
      { path: 'new', component: GamingeventEditComponent},
      { path: ':id/edit', component: GamingeventEditComponent },
      { path: ':id', component: GamingeventDetailsComponent },
    ]
  },
  {
    path: 'groups', component: UsergroupComponent, children: [
      { path: 'new', component: UsergroupEditComponent},
      { path: ':id/edit', component: UsergroupEditComponent},
      { path: ':id', component: UsergroupComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
