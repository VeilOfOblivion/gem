import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  currentUser: User | undefined = undefined;
  userSub: Subscription | undefined;
  wrongCredentials = false;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.userSub = this.userService.onUserChange.subscribe((user) => {
      this.currentUser = user;
      this.navigateAwayIfLoggedIn();
    });
    this.navigateAwayIfLoggedIn();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  private navigateAwayIfLoggedIn(): void {
    if (this.currentUser != undefined) {
      this.router.navigate(['user']);
    }
  }

  public onSubmit(form: NgForm): void {
    this.userService.login(form.value.username, form.value.password, () => { this.wrongCredentials = true; });
  }
}
