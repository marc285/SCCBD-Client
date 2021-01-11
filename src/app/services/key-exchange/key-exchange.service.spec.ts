import { TestBed } from '@angular/core/testing';

import { KeyExchangeService } from './key-exchange.service';

describe('KeyExchangeService', () => {
  let service: KeyExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
