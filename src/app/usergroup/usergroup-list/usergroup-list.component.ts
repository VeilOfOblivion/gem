import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserGroup } from 'src/app/models/usergroup.model';
import { UserService } from 'src/app/services/user.service';
import { UsergroupsService } from 'src/app/services/usergroups.service';

@Component({
  selector: 'app-usergroup-list',
  templateUrl: './usergroup-list.component.html',
  styleUrls: ['./usergroup-list.component.scss']
})
export class UsergroupListComponent implements OnInit, OnDestroy {
  userGroups: UserGroup[] = [];
  changeUserGroupSub: Subscription | undefined;
  
  constructor(public userService : UserService, public userGroupsService: UsergroupsService ) { }
  
  ngOnInit(): void {
    this.changeUserGroupSub = this.userGroupsService.onUserGroupChange.subscribe((userGroups) => {
      this.userGroups = userGroups;
    });
    this.userGroupsService.getAllUserGroups((userGroups) => {
      this.userGroups = userGroups;
    });
  }

  ngOnDestroy(): void {
    this.changeUserGroupSub?.unsubscribe();
  }
}
