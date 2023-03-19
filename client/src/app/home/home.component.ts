import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  categories: any[] = [
    {
      name: 'All',
    },
    {
      name: 'Shoes',
    },
    {
      name: 'Electronics',
    },
    {
      name: 'Others',
    },
  ];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    setTimeout(() => {
      this.productService.getAllProducts(99999, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.allProducts = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.allProducts = [...this.allProducts, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }

  filter(category){
    this.products = this.allProducts;
    if(category == "All") return;
    this.products= this.products.filter(product => product.category == category);
  }
}
