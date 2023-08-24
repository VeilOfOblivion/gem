import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  onUserChange = new Subject<User | undefined>();
  _currentUser: User | undefined;
  token: string | undefined;

  constructor(public http: HttpClient) { }

  getLocalTokenAndRefresh(onNewTokenReceived: () => void = () => { }) {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      this.token = localToken;
      this.http.get<{ token: string; user: User; }>(environment.apiUrl + "/user/refresh").subscribe({
        next: (data) => {
          this._currentUser = data.user;
          this.token = data.token;
          localStorage.setItem("authToken", this.token);
          this.onUserChange.next(this._currentUser);
          onNewTokenReceived();
        },
        error: (error) => {
          localStorage.removeItem("authToken");
          this._currentUser = undefined;
          this.token = "";
        }
      });
    }
  }

  login(username: string, password: string, onWrongCredentials: () => void = () => { }): void {
    let body = { username: username, password: password };
    this.http.post<{ token: string, user: User }>(environment.apiUrl + "/user/login", body).subscribe({
      next: (data) => {
        this._currentUser = data.user;
        this.token = data.token;
        localStorage.setItem("authToken", this.token);
        this.onUserChange.next(this.getCurrentUser());
      },
      error: (error) => {
        this._currentUser = undefined;
        this.onUserChange.next(undefined);
        onWrongCredentials();

      }
    });
  }

  logout(): void {
    this._currentUser = undefined;
    this.token = "";
    this.onUserChange.next(undefined);
    localStorage.removeItem("authToken");
  }

  public getCurrentUser(): User | undefined {
    return this._currentUser;
  }
}
