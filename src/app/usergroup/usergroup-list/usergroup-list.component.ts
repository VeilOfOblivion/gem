import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserGroup } from 'src/app/models/usergroup.model';
import { UserService } from 'src/app/services/user.service';
import { UsergroupsService } from 'src/app/services/usergroups.service';

@Component({
  selector: 'app-usergroup-list',
  templateUrl: './usergroup-list.component.html',
  styleUrls: ['./usergroup-list.component.scss']
})
export class UsergroupListComponent implements OnInit, OnDestroy {
  ownedGroups: UserGroup[] = [];
  joinedGroups: UserGroup[] = [];
  otherGroups: UserGroup[] = [];
  changeUserGroupSub: Subscription | undefined;
  
  constructor(public userService : UserService, public userGroupsService: UsergroupsService ) { }
  
  ngOnInit(): void {
    this.changeUserGroupSub = this.userGroupsService.onUserGroupChange.subscribe((userGroups) => {
      this.initUserGroups(userGroups);
    });
    this.userGroupsService.getAllUserGroups((userGroups) => {
      this.initUserGroups(userGroups);
    });
  }

  ngOnDestroy(): void {
    this.changeUserGroupSub?.unsubscribe();
  }

  
  initUserGroups(allGroups: UserGroup[]) {
    const userId = this.userService.currentUser?.id;
    if (!userId) {
      this.otherGroups = allGroups;
      return;
    }
    this.ownedGroups = [];
    this.joinedGroups = [];
    this.otherGroups = [];
    allGroups.forEach((ug) => {
      if (ug.ownerId === userId) {
        this.ownedGroups.push(ug);
        return;
      }
      if (ug.members.includes(userId))  {
        this.joinedGroups.push(ug);
        return;
      }
      this.otherGroups.push(ug);
    })
  }
}
