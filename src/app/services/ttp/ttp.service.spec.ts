import { TestBed } from '@angular/core/testing';

import { TtpService } from './ttp.service';

describe('TtpService', () => {
  let service: TtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
