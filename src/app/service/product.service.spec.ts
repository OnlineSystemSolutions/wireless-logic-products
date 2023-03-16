import { waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { ProductService } from './product.service';

describe('TaskTypesService', () => {
    const htmlMock = `<html>
    <body>
      <div class='package-features'>
        <div class='package-name'>Standard: 12GB Data - 1 Year</div>
        <div class='package-description'>The standard subscription providing you with enough service time to support the average user with Data and SMS services to allow access to your device.</div>
        <div class='package-price'>
          <div class='price-big'>£108.00
            <p style='color:red'>Save £11.90 on the monthly price</p>
          </div>
        </div>
      </div>
      <div class='package-features'>
        <div class='package-name'>Optimum: 24GB Data - 1 Year</div>
        <div class='package-description'>The optimum subscription providing you with enough service time to support the above-average with data and SMS services to allow access to your device..</div>
        <div class='package-price'>
          <div class='price-big'>£174.00
            <p style='color:red'>Save £17.90 on the monthly price</p>
          </div>
        </div>
      </div>
    </body></html>`;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  mockHttpService.get.and.returnValue(of(htmlMock));
  const service: ProductService = new ProductService(mockHttpService);

  beforeEach(() => {
    spyOn(service, 'map').and.callThrough();
    spyOn(service, 'getDiscount').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('getTypesOfWork should make correct api call', waitForAsync(() => {
    service.get().subscribe(response => {
      expect(response.length).toEqual(2);
      expect(service.map).toHaveBeenCalledWith(htmlMock);
      expect(service.getDiscount).toHaveBeenCalled();
    })
    expect(mockHttpService.get).toHaveBeenCalled();
  }));
});
