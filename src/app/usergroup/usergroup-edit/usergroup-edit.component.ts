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
  
  constructor(public userService: UserService, public userGroupsService: UsergroupsService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.initForm();
    this.userGroupsService.getUserGroupById(this.id, this.updateUserGroup.bind(this));
  }

  ngOnDestroy(): void {
    this.selectedSub?.unsubscribe();
  }

  updateUserGroup(userGroup: UserGroup | undefined): void {
    this.selectedGroup = userGroup;
    if (this.selectedGroup?.ownerId != this.userService.currentUser?.id) 
      this.router.navigate(["../"], {relativeTo:this.route});
    else 
      this.initForm();
  }

  initForm() {
    this.groupForm = new FormGroup({
      'title': new FormControl(this.selectedGroup?.title),
      'description': new FormControl(this.selectedGroup?.description)
    });
  }

  onSubmit(): void {
    if (this.userService.currentUser) {
      if (this.groupForm.invalid) return;
      let title = this.groupForm.value.title;
      let description = this.groupForm.value.description;
      let group = new UserGroup(this.id, title, description, this.userService.currentUser.id, this.userService.currentUser.username, true, true, false, [], [], []);
      //this.userGroupsService.addGroup(group);
      console.log(group);
    }
    this.router.navigate(["../"], { relativeTo: this.route })
  }
}
