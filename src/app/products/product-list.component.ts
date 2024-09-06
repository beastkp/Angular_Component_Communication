import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { filter } from 'rxjs';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';
  // listFilter = ''; // you cant define the property with a declaratiuon and getter and setter
  // showImage = false;
  includeDetail: boolean = true;
  @ViewChild(CriteriaComponent) filterComponent !: CriteriaComponent // this has created reference to the child component 
  parentListFilter !: string;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  @ViewChild('filterElement') filterElementRef!: ElementRef;
  // ! - definite assignment assertion operator, the filterelementRef is a reference property that contains the reference to the input element so that we can access the elements properties 
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  private _listFilter!: string;
  // !- definite assignment assertion operator- tells that the property will definetely be assigned a value at some point even ythough it doesnt have an initial value
  get listFilter():string{
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.performFilter(this._listFilter);
  }

  get showImage():boolean{
    return this .productParameterService.showImage;
  }
  set showImage(value: boolean){
    this.productParameterService.showImage = value;
  }

  constructor(private productService: ProductService, private productParameterService: ProductParameterService) { 
    // console.log("This is ",this.filterElementRef);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit(): void {
    // console.log("This is ",this.filterElementRef);
    this.filterElementRef?.nativeElement.focus();
    // accessing the reference once the viewin rendered

    this.parentListFilter = this.filterComponent.listFilter; // this viewchild property has every attribute that is defined in the critera component.
    
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onValueChange(value: string): void {
    this.performFilter(value);
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

  // onfilterChange(filter:string){
  //    this.listFilter = filter;
  //    this.performFilter(this.listFilter);
  // }
  // we ca nreplace this by using getter and setter
}
