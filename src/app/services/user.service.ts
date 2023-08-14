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

  public login(username: string, password: string, onWrongCredentials: () => void = () => { }) {
    let body = { username: username, password: password };
    this.http.post<{ token: string, user: User }>(environment.apiUrl + "/user/login", body).subscribe({
      next: (data) => {
        console.log("Logged In");
        this.currentUser = data.user;
        this.token = data.token;
        this.onUserChange.next(this.currentUser);
      },
      error: (error) => {
        console.log(error);
        this.currentUser = undefined;
        this.onUserChange.next(this.currentUser);
        onWrongCredentials();
      }
    });
  }
}
