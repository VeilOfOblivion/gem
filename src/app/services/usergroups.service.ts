import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserGroup } from '../models/usergroup.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsergroupsService {
  onUserGroupChange = new Subject<UserGroup[]>();
  constructor(public userService: UserService, public http: HttpClient) { }

  getUserGroupById(userGroupId: string, onDataFetched: (userGroups: UserGroup | undefined) => void, onError: (error: any) => void = () => { }): void {
    this.http.get<UserGroup>(environment.apiUrl + "/user-group/" + userGroupId).subscribe({
      next: (data) => {
        onDataFetched(data);
      },
      error: (error) => {
        onDataFetched(undefined);
        onError(error);
      },
    });
  }

  getAllUserGroups(onDataFetched: (userGroups: UserGroup[]) => void, onError: (error: any) => void = () => { }) {
    this.http.get<UserGroup[]>(environment.apiUrl + "/user-group/list").subscribe({
      next: (data) => {
        onDataFetched(data);
      },
      error: (error) => {
        onDataFetched([]);
        onError(error);
      },
    });
  }

  addGroup(group: UserGroup, onDataStored: (userGroups: UserGroup[]) => void, onError: (error: any) => void = () => { }) {
    if (!group.id) {

      this.http.post<UserGroup[]>(environment.apiUrl + "/user-group/add", group).subscribe({
        next: (data) => {
          onDataStored(data);
          this.getAllUserGroups(groups => this.onUserGroupChange.next(groups));
        },
        error: (error) => {
          onError(error);
        },
      });
    }
    else {
      this.http.patch<UserGroup[]>(environment.apiUrl + "/user-group/" + group.id + "/update", group).subscribe({
        next: (data) => {
          onDataStored(data);
          this.getAllUserGroups(groups => this.onUserGroupChange.next(groups));
        },
        error: (error) => {
          onError(error);
        },
      });
    }
  }
}
