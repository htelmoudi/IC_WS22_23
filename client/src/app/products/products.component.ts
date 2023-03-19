import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = '';
  image = '';
  price = '';
  quantity = '';
  description = '';
  errorMessage = '';
  vendors: any;
  isVisible = false;
  user: any;
  products: any[] = [];
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._api.getTypeRequest(`products/vendor/`+this.user.id).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }

  deleteRow(id: string): void {
    this.products = this.products.filter(d => d.id !== id);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.errorMessage = '';
    if (this.title && this.price && this.image && this.quantity && this.description) {
        this._api
          .postTypeRequest(`products`,{
            title: this.title,
            image: this.image,
            price: this.price,
            quantity: this.quantity,
            description: this.description,
            user_id: this.user.id,
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
