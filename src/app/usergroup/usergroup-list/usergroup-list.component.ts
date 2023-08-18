import { Component, OnInit } from '@angular/core';
import { UserGroup } from 'src/app/models/usergroup.model';
import { UsergroupsService } from 'src/app/services/usergroups.service';

@Component({
  selector: 'app-usergroup-list',
  templateUrl: './usergroup-list.component.html',
  styleUrls: ['./usergroup-list.component.scss']
})
export class UsergroupListComponent implements OnInit {
  userGroups: UserGroup[] = [];
  constructor(public userGroupsService: UsergroupsService) { }

  ngOnInit(): void {
    this.userGroupsService.getAllUserGroups((userGroups) => {
      this.userGroups = userGroups;
    });
  }

}
