import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductListingComponent } from './product-listing.component';
import { ProductService } from '../../service/product.service';
import { ProductModel } from '../../model/product-model';
import { of } from 'rxjs';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const productService = new ProductService(mockedHttpClient);
  const prod = {
    description: 'description 1',
    price: '10.00',
    title: 'Option 1',
    discount: '10%'
  } as ProductModel;
  
  beforeEach(async () => {
   
    spyOn(productService, 'get').and.returnValue(of([prod]));
    await TestBed.configureTestingModule({
      declarations: [ProductListingComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productService },
      ]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method get from productService', () => {
    expect(productService.get).toHaveBeenCalled();
    expect(component.result).toEqual([prod]);
  });

  
});
