import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  // Need to handle null to allow for no selected product.
  // product: IProduct | null = null;
  // product = this.productService.currentProduct; // as this will send product only once
  errorMessage = '';
  product!: IProduct | null;

  // get product(): IProduct | null{
  //   return this.productService.currentProduct;
  // }

  constructor(private productService: ProductService) {}
 
  ngOnInit() {
    this.productService.selectedProductChanges$.subscribe({
      next: (selectedProduct) => (this.product = selectedProduct),
    });
  }
}
