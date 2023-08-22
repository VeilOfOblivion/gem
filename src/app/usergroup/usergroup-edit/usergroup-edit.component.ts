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
  
  constructor(public userService: UserService, public userGroupsService: UsergroupsService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.initForm();
    if (this.id) 
      this.userGroupsService.getUserGroupById(this.id, this.updateUserGroup.bind(this));
  }

  ngOnDestroy(): void {
    this.selectedSub?.unsubscribe();
  }

  updateUserGroup(userGroup: UserGroup | undefined): void {
    this.selectedGroup = userGroup;
    if (!this.selectedGroup || this.selectedGroup?.ownerId != this.userService.currentUser?.id) 
      this.router.navigate(["../"], {relativeTo:this.route});
    else {
      this.hasMembers = this.selectedGroup.members.length > 0;
      this.hasInvitees = this.selectedGroup.invitees.length > 0;
      this.hasRequestors = this.selectedGroup.requestsToJoin.length > 0;
      this.hasExcludees = this.selectedGroup.excludees.length > 0;
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
    if (this.userService.currentUser) {
      if (this.groupForm.invalid) return;
      const title = this.groupForm.value.title;
      const description = this.groupForm.value.description;
      const registrationRequired = this.groupForm.value.registrationRequired;
      const invitationRequired = this.groupForm.value.invitationRequired;
      const visibleToFriends = this.groupForm.value.visibleToFriends;
      const permissionToJoinRequired = this.groupForm.value.permissionToJoinRequired;
      const group = new UserGroup(this.id, title, description, this.userService.currentUser.id, this.userService.currentUser.username, registrationRequired, invitationRequired, visibleToFriends, permissionToJoinRequired, [], [], [], [], [], [], [],[]);
      this.userGroupsService.addGroup(group, (newGroup: UserGroup, isNew: boolean) => {
        if (isNew)
          this.router.navigate(["..",  newGroup.id], { relativeTo: this.route })
        else
          this.router.navigate(["../..",  newGroup.id], { relativeTo: this.route })
      });
    }
  }
}
