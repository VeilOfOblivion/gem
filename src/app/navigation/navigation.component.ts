import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  currentUser: User | undefined = undefined;
  userSub: Subscription | null = null;
  constructor(public userService: UserService, public router: Router) { }
  
  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userSub = this.userService.onUserChange.subscribe((user) => {
      this.currentUser = user;
    })
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
