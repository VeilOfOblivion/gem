import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserGroup } from 'src/app/models/usergroup.model';
import { UserService } from 'src/app/services/user.service';
import { UsergroupsService } from 'src/app/services/usergroups.service';

@Component({
  selector: 'app-usergroup-details',
  templateUrl: './usergroup-details.component.html',
  styleUrls: ['./usergroup-details.component.scss']
})
export class UsergroupDetailsComponent implements OnInit, OnDestroy {
  userGroup : UserGroup | undefined = undefined;
  user: User | undefined;
  changeUserGroupSub: Subscription | undefined;
  isOwner: boolean = false;

  constructor (public userService: UserService, public userGroupService: UsergroupsService, public router : Router, public activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.changeUserGroupSub = this.activeRoute.params.subscribe((params) => {
      this.userGroupService.getUserGroupById(params["id"], this.updateUserGroup.bind(this));
    });

  }

  ngOnDestroy(): void {
    this.changeUserGroupSub?.unsubscribe();
  }

  updateUserGroup(foundUserGroup: UserGroup | undefined): void {
    this.userGroup = foundUserGroup;
    if (this.userGroup?.ownerId === this.userService.currentUser?.id)
      this.isOwner = true;
    else 
      this.isOwner = false;
  }
}
