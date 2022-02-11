import { TestBed } from '@angular/core/testing';

import { CoinapiService } from './coinapi.service';

describe('CoinapiService', () => {
  let service: CoinapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
