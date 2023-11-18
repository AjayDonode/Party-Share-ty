import { TestBed } from '@angular/core/testing';

import { EventUserAccessService } from './event-user-access.service';

describe('EventUserAccessService', () => {
  let service: EventUserAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventUserAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
