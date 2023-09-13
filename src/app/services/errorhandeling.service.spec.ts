import { TestBed } from '@angular/core/testing';

import { ErrorhandelingService } from './errorhandeling.service';

describe('ErrorhandelingService', () => {
  let service: ErrorhandelingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorhandelingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
