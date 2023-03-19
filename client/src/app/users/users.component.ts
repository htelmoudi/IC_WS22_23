import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Users } from '../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: any;
  users: Users;
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _user: UserService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this._api.getTypeRequest(`users`).subscribe(
      (res: any) => {
        console.log(res);
        this.users = res;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
