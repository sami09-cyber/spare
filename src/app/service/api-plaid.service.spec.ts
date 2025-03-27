import { TestBed } from '@angular/core/testing';

import { ApiPlaidService } from './api-plaid.service';

describe('ApiPlaidService', () => {
  let service: ApiPlaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPlaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
