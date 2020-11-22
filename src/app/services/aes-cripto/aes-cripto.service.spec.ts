import { TestBed } from '@angular/core/testing';

import { CriptoService } from './aes-cripto.service';

describe('CriptoService', () => {
  let service: CriptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
