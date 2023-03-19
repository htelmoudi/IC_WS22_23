import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../shared/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient, private _api: ApiService) {}

  getAllVendors(limitOfResults = 9, page): Observable<Users> {
    return this.http.get<Users>(this.url + 'users', {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getAllUsers(limitOfResults = 9, page): Observable<Users> {
    return this.http.get<Users>(this.url + 'users', {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getSingleUser(id: Number): Observable<any> {
    console.log(id);
    return this._api.getTypeRequest('users/' + id);
  }
}

