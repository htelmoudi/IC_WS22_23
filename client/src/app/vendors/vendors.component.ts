import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Users } from '../shared/models/user.model';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  user: any;
  vendors: any;
  error = '';
  isVisible = false;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._api.getTypeRequest(`users/vendors`).subscribe(
      (res: any) => {
        console.log(res);
        this.vendors = res;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }

  deleteRow(id: string): void {
    this._api.deleteTypeRequest(`auth/`, id).subscribe(
      (res: any) => {
        this.getAll();
      },
      (err) => {
        this.error = err.error.message;
      }
    );
    this.vendors.data = this.vendors.data.filter(d => d.id !== id);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.errorMessage = '';
    if (this.fullName && this.password && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      } else {
        this._auth
          .register({
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            role: "vendor",
          })
          .subscribe(
            (res) => {
              console.log(res);
              this.getAll();
              this.isVisible = false;
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  i = 0;
  editId: string | null = null;

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
}
