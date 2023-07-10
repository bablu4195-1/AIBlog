import { TestBed } from '@angular/core/testing';

import { CryptosocketService } from './cryptosocket.service';

describe('CryptosocketService', () => {
  let service: CryptosocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptosocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
