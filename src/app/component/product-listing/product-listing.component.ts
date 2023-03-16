import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { ProductModel } from '../../model/product-model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  public isBusy: boolean = false;
  result: ProductModel[] | undefined;
  public subscription!: Subscription;

  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isBusy = true;
    this.subscription = this.productService.get().subscribe(response => {
      this.result = response;
      this.isBusy = false;
    }, e => console.log('error', e));
  }
}
