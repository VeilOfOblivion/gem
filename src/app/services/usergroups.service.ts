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

  addGroup(group: UserGroup, onDataStored: (userGroup: UserGroup, isNew: boolean) => void, onError: (error: any) => void = () => { }) {
    if (!group.id) {

      this.http.post<{message: string, userGroup: UserGroup}>(environment.apiUrl + "/user-group/add", group).subscribe({
        next: (data) => {
          this.getAllUserGroups(groups => this.onUserGroupChange.next(groups));
          onDataStored(data.userGroup, true);
        },
        error: (error) => {
          onError(error);
        },
      });
    }
    else {
      this.http.patch<{message: string, userGroup: UserGroup}>(environment.apiUrl + "/user-group/" + group.id + "/update", group).subscribe({
        next: (data) => {
          this.getAllUserGroups(groups => this.onUserGroupChange.next(groups));
          onDataStored(data.userGroup, false);
        },
        error: (error) => {
          onError(error);
        },
      });
    }
  }

  deleteById(userGroupId: string) {
    if (!this.userService.currentUser) return;
    const group = this.getUserGroupById(userGroupId, (group) => {
      this.http.delete(environment.apiUrl + "/user-group/" + userGroupId + "/remove").subscribe({
        next: (data) => {
          this.getAllUserGroups((groups) => {
            this.onUserGroupChange.next(groups);
          })
        }
      });
    })
    
  }

  joinById(userGroupId: string) {
    if (!this.userService.currentUser) return;
    this.http.put(environment.apiUrl + "/user-group/" + userGroupId + "/join","").subscribe({
      next: () => {
        this.getAllUserGroups((groups) => {
          this.onUserGroupChange.next(groups);
        });
      }})
  }

  leaveById(userGroupId: string) {
    if (!this.userService.currentUser) return;
    this.http.put(environment.apiUrl + "/user-group/" + userGroupId + "/leave","").subscribe({
      next: () => {
        this.getAllUserGroups((groups) => {
          this.onUserGroupChange.next(groups);
        });
      }
    });
  }

  requestById(userGroupId: string) {
    if (!this.userService.currentUser) return;
    this.http.put(environment.apiUrl + "/user-group/" + userGroupId + "/request","").subscribe({
      next: () => {
        this.getAllUserGroups((groups) => {
          this.onUserGroupChange.next(groups);
        });
      }
    });
  }
  
  cancelRequestById(userGroupId: string) {
    if (!this.userService.currentUser) return;
    this.http.put(environment.apiUrl + "/user-group/" + userGroupId + "/cancelRequest","").subscribe({
      next: () => {
        this.getAllUserGroups((groups) => {
          this.onUserGroupChange.next(groups);
        });
      }
    });
  }

  acceptRequestByIds(userId: string, userGroupId: string, ) {
    if (!this.userService.currentUser) return;
    this.http.put(environment.apiUrl + "/user-group/" + userGroupId + "/acceptRequest",{userId: userId}).subscribe({
      next: () => {
        this.getAllUserGroups((groups) => {
          this.onUserGroupChange.next(groups);
        });
      }
    });
  }

  rejectRequestByIds(userId: string, userGroupId: string, ) {
    if (!this.userService.currentUser) return;
    this.http.put(environment.apiUrl + "/user-group/" + userGroupId + "/rejectRequest",{userId: userId}).subscribe({
      next: () => {
        this.getAllUserGroups((groups) => {
          this.onUserGroupChange.next(groups);
        });
      }
    });
  }
}
