import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { ProductModel } from "../model/product-model";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  fullPath: string;
  constructor(private readonly httpClient: HttpClient) {
    this.fullPath = environment.apiUrl;
  }

  // This method retrieves the products as a observable
  public get(): Observable<ProductModel[]> {
    const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    responseType: 'text'
  };

    return this.httpClient.get<any>(this.fullPath,  httpOptions as unknown as any).pipe(
      map(response => {
        return this.map(response as unknown as string)
      })
    );
  }

  // This method maps the html to the product models
  public map(data: string): ProductModel[] {

    const mock = `<html><div class='package-name'></div></html>`
    const doc = document.createElement('div');
    doc.innerHTML = data;
    const features = doc.getElementsByClassName('package-features');
    const result = [];
    for (let i = 0; i < features.length; i++) {
      // Localise product details
      const option = features[i].getElementsByClassName('package-name');
      const descriptions = features[i].getElementsByClassName('package-description');
      const priceElements = features[i].getElementsByClassName('package-price');
      let discount = '';
      let price = '';
      if (priceElements.length) {
        // Get price 
        const bigPriceElement = priceElements[0].getElementsByClassName('price-big');
        price = (bigPriceElement?.length) ? bigPriceElement[0].innerHTML : ''

        const discountElement = priceElements[0].getElementsByTagName('p');
        discount = this.getDiscount(discountElement);
      }
  
      const product = {
        description: descriptions?.length ? descriptions[0].innerHTML : '',
        title: option?.length ? option[0].innerHTML : '',
        price: price?.length ? price.replace(/[^0-9\.]+/g, "") : '',
        discount: discount.replace(/[^0-9\.]+/g, ""),
      }
      result.push(product);
    }
    return result;
  }

  // This method depicts the discount from the price element
  public getDiscount(discountElement: HTMLCollectionOf<HTMLParagraphElement>): string {
    let discount = '';
    if (discountElement.length) {
      const style = discountElement.length && discountElement[0].attributes.getNamedItem('style')
        ? discountElement[0].attributes.getNamedItem('style') : {} as Attr;
      if (style?.value === 'color: red') {
        discount = discountElement[0].innerHTML;
      }
    }
    return discount;
  }
}