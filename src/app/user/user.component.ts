import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  currentUser: User | undefined;
  userSub: Subscription | undefined;

  constructor(public userService: UserService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['login'], { relativeTo: this.activeRoute })
    }
    else {
      this.currentUser = this.userService.getCurrentUser();
      this.userSub = this.userService.onUserChange.subscribe((user) => {
        this.currentUser = user;
        if (!this.userService.getCurrentUser()) {
          this.router.navigate(['login'], { relativeTo: this.activeRoute })
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onLogout(): void {
    this.userService.logout();
  }
}
