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
  userGroup: UserGroup | undefined = undefined;
  user: User | undefined;
  changeRouteSub: Subscription | undefined;
  changeUserGroupSub: Subscription | undefined;
  canEdit = false;
  canManage = false;
  isOwner = false;
  hasJoined = false;
  hasRequested = false;

  constructor(public userService: UserService, public userGroupService: UsergroupsService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.changeRouteSub = this.activeRoute.params.subscribe((params) => {
      this.userGroupService.getUserGroupById(params["id"], this.updateUserGroup.bind(this));
    });
    this.changeUserGroupSub = this.userGroupService.onUserGroupChange.subscribe(userGroups => this.userGroup = userGroups.find(ug => ug.id === this.userGroup?.id))
  }

  ngOnDestroy(): void {
    this.changeUserGroupSub?.unsubscribe();
    this.changeRouteSub?.unsubscribe();
  }

  updateUserGroup(foundUserGroup: UserGroup | undefined): void {
    const currentUser = this.userService.getCurrentUser();
    this.userGroup = foundUserGroup;
    if (!this.userGroup || !currentUser) return;
    this.canEdit = this.userGroupService.canUserIdEdit(this.userGroup, currentUser.id);
    this.canManage = this.userGroupService.canUserIdManage(this.userGroup, currentUser.id);
    this.isOwner = this.userGroup.ownerId === currentUser.id;
    this.hasJoined = this.userGroup.members.includes(currentUser.id);
    this.hasRequested = this.userGroup.requestsToJoin.includes(currentUser.id);
  }

  onDelete() {
    if (!this.userGroup || this.userGroup.ownerId != this.userService.getCurrentUser()?.id) return;
    this.userGroupService.deleteById(this.userGroup.id);
    this.router.navigate([".."], { relativeTo: this.activeRoute });
  }

  onJoin() {
    if (!this.userGroup || this.userGroup.ownerId == this.userService.getCurrentUser()?.id) return;
    this.userGroupService.joinById(this.userGroup.id);
    this.hasJoined = true;
  }

  onRequest() {
    if (!this.userGroup || this.userGroup.ownerId == this.userService.getCurrentUser()?.id) return;
    this.userGroupService.requestById(this.userGroup.id);
    this.hasRequested = true;
  }

  onCancelRequest() {
    if (!this.userGroup || this.userGroup.ownerId == this.userService.getCurrentUser()?.id) return;
    this.hasRequested = false;
    this.userGroupService.cancelRequestById(this.userGroup.id);
  }

  onLeave() {
    if (!this.userGroup || this.userGroup.ownerId == this.userService.getCurrentUser()?.id) return;
    this.userGroupService.leaveById(this.userGroup.id);
    this.hasJoined = false;
  }

  onAccept(userId: string) {
    if (!this.userGroup) return;
    this.userGroupService.acceptRequestByIds(userId, this.userGroup.id);
  }

  onReject(userId: string) {
    if (!this.userGroup) return;
    this.userGroupService.removeRequestByIds(userId, this.userGroup.id);
  }

}
