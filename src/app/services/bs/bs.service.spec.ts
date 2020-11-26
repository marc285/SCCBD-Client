import { TestBed } from '@angular/core/testing';

import { BsService } from './bs.service';

describe('BsService', () => {
  let service: BsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
