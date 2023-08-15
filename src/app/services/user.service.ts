import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  onUserChange = new Subject<User | undefined>();
  currentUser: User | undefined;
  token: string | undefined;

  constructor(public http: HttpClient) { }

  public login(username: string, password: string, onWrongCredentials: () => void = () => { }): void {
    let body = { username: username, password: password };
    this.http.post<{ token: string, user: User }>(environment.apiUrl + "/user/login", body).subscribe({
      next: (data) => {
        this.currentUser = data.user;
        this.token = data.token;
        this.onUserChange.next(this.currentUser);
      },
      error: (error) => {
        console.error(error);
        this.currentUser = undefined;
        this.onUserChange.next(this.currentUser);
        onWrongCredentials();
        
      }
    });
  }

  public logout(): void {
    this.currentUser = undefined;
    this.onUserChange.next(undefined);
  }
}
