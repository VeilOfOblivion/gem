import { NgModule, inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserComponent } from './user/user.component';
import { GamingeventComponent } from './gamingevent/gamingevent.component';
import { GamingeventEditComponent } from './gamingevent/gamingevent-edit/gamingevent-edit.component';
import { GamingeventDetailsComponent } from './gamingevent/gamingevent-details/gamingevent-details.component';
import { UsergroupEditComponent } from './usergroup/usergroup-edit/usergroup-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UsergroupListComponent } from './usergroup/usergroup-list/usergroup-list.component';
import { UsergroupDetailsComponent } from './usergroup/usergroup-details/usergroup-details.component';
import { UserService } from './services/user.service';
import { UsergroupsService } from './services/usergroups.service';

const routes: Routes = [
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user', component: UserComponent },
  {
    path: 'events', component: GamingeventComponent, children: [
      { path: 'new', component: GamingeventEditComponent },
      { path: 'list', component: GamingeventComponent },
      { path: ':id/edit', component: GamingeventEditComponent },
      { path: ':id', component: GamingeventDetailsComponent },
    ]
  },
  {
    path: 'groups', component: UsergroupListComponent, children: [
      { path: 'new', component: UsergroupEditComponent },
      { path: ':id/edit', component: UsergroupEditComponent, canActivate: [isAuthenticated()] },
      { path: ':id', component: UsergroupDetailsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

function isAuthenticated() : CanActivateFn {
  return () => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);
    if (userService.currentUser ) {
      return true;
    }
    router.navigate(["user","login"]);
    return false;
  };
}