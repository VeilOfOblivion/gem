import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserGroup } from 'src/app/models/usergroup.model';
import { UserService } from 'src/app/services/user.service';
import { UsergroupsService } from 'src/app/services/usergroups.service';

@Component({
  selector: 'app-usergroup-edit',
  templateUrl: './usergroup-edit.component.html',
  styleUrls: ['./usergroup-edit.component.scss']
})
export class UsergroupEditComponent implements OnInit, OnDestroy {
  selectedGroup: UserGroup | undefined;
  selectedSub: Subscription | undefined;
  groupForm: FormGroup = new FormGroup({});
  id: string = "";
  hasMembers = false;
  hasInvitees = false;
  hasRequestors = false;
  hasExcludees = false;
  canEditUsers = false;
  isOwner = false;

  constructor(public userService: UserService, public userGroupsService: UsergroupsService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.initForm();
    if (this.id)
      this.userGroupsService.getUserGroupById(this.id, this.updateUserGroup.bind(this));
    this.selectedSub = this.userGroupsService.onUserGroupChange.subscribe((groups: UserGroup[]) => {
      this.updateUserGroup(groups.find(g => g.id == this.id));
    });
  }

  ngOnDestroy(): void {
    this.selectedSub?.unsubscribe();
  }

  updateUserGroup(userGroup: UserGroup | undefined): void {
    this.selectedGroup = userGroup;
    const currentUserId = this.userService.getCurrentUser()?.id;
    if (!currentUserId) return;
    if (!this.selectedGroup || !this.userGroupsService.canUserIdEdit(this.selectedGroup, currentUserId))
      this.router.navigate(["../"], { relativeTo: this.route });
    else {
      this.hasMembers = this.selectedGroup.members.length > 0;
      this.hasInvitees = this.selectedGroup.invitees.length > 0;
      this.hasRequestors = this.selectedGroup.requestsToJoin.length > 0;
      this.hasExcludees = this.selectedGroup.excludees.length > 0;
      this.canEditUsers = this.userGroupsService.canUserIdManage(this.selectedGroup, currentUserId);
      this.isOwner = this.selectedGroup.ownerId === currentUserId;
      this.initForm();
    }
  }

  initForm() {
    this.groupForm = new FormGroup({
      'title': new FormControl(this.selectedGroup?.title),
      'description': new FormControl(this.selectedGroup?.description),
      'registrationRequired': new FormControl(this.selectedGroup?.registrationRequired),
      'invitationRequired': new FormControl(this.selectedGroup?.invitationRequired),
      'visibleToFriends': new FormControl(this.selectedGroup?.visibleToFriends),
      'permissionToJoinRequired': new FormControl(this.selectedGroup?.permissionToJoinRequired),
    });
  }

  onSubmit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      if (this.groupForm.invalid) return;
      const title = this.groupForm.value.title;
      const description = this.groupForm.value.description;
      const registrationRequired = this.groupForm.value.registrationRequired;
      const invitationRequired = this.groupForm.value.invitationRequired;
      const visibleToFriends = this.groupForm.value.visibleToFriends;
      const permissionToJoinRequired = this.groupForm.value.permissionToJoinRequired;
      const requestsToJoin = this.selectedGroup ? this.selectedGroup.requestsToJoin : [];
      const requestUsernames = this.selectedGroup ? this.selectedGroup.requestUsernames : [];
      const invitees = this.selectedGroup ? this.selectedGroup.invitees : [];
      const inviteeUsernames = this.selectedGroup ? this.selectedGroup.inviteeUsernames : [];
      const members = this.selectedGroup ? this.selectedGroup.members : [];
      const memberUsernames = this.selectedGroup ? this.selectedGroup.memberUsernames : [];
      const excludees = this.selectedGroup ? this.selectedGroup.excludees : [];
      const excludeeUsernames = this.selectedGroup ? this.selectedGroup.excludeeUsernames : [];
      const usersWhoCanEdit = this.selectedGroup ? this.selectedGroup.usersWhoCanEdit : [];
      const usersWhoCanManage = this.selectedGroup ? this.selectedGroup.usersWhoCanManage : [];
      const group = new UserGroup(this.id, title, description, currentUser.id, currentUser.username, registrationRequired, invitationRequired, visibleToFriends, permissionToJoinRequired, requestsToJoin, invitees, members, excludees, memberUsernames, inviteeUsernames, excludeeUsernames, requestUsernames, usersWhoCanEdit, usersWhoCanManage);
      this.userGroupsService.addGroup(group, (newGroup: UserGroup, isNew: boolean) => {
        if (isNew)
          this.router.navigate(["..", newGroup.id], { relativeTo: this.route })
        else
          this.router.navigate(["../..", newGroup.id], { relativeTo: this.route })
      });
    }
  }

  onInvite(username: string) {
    if (!this.selectedGroup) return;
    this.userGroupsService.inviteByUsername(this.selectedGroup.id, username);
  }
  onExclude(username: string) {
    if (!this.selectedGroup) return;
    this.userGroupsService.excludeByUsername(this.selectedGroup.id, username);
  }

  onRemoveMember(index: number) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.members[index];
    this.userGroupsService.removeMemberByIds(this.selectedGroup?.id, id);
  }

  onAcceptRequestor(index: number) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.requestsToJoin[index];
    this.userGroupsService.acceptRequestByIds(id, this.selectedGroup?.id);
  }

  onRemoveRequestor(index: number) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.requestsToJoin[index];
    this.userGroupsService.removeRequestByIds(this.selectedGroup?.id, id);
  }

  onRemoveInvitee(index: number) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.invitees[index];
    this.userGroupsService.removeInviteeByIds(this.selectedGroup?.id, id);
  }

  onRemoveExcludee(index: number) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.excludees[index];
    this.userGroupsService.removeExcludeeByIds(this.selectedGroup?.id, id);
  }

  onToggleEdit(index: number, status: boolean) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.members[index];
    this.userGroupsService.setUserEditRight(this.selectedGroup.id, id, status);
  }
  
  onToggleManage(index: number, status: boolean) {
    if (!this.selectedGroup) return;
    const id = this.selectedGroup?.members[index];
    this.userGroupsService.setUserManageRight(this.selectedGroup.id, id, status );
  }

  isAbleToEdit(userId: string) : boolean {
    if (!this.selectedGroup) return false;
    return this.selectedGroup.usersWhoCanEdit.includes(userId);
  }

  isAbleToManage(userId: string) : boolean {
    if (!this.selectedGroup) return false;
    return this.selectedGroup.usersWhoCanManage.includes(userId);
  }
}
