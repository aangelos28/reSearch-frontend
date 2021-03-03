import { TestBed } from '@angular/core/testing';

import { WorkTrackerService } from './work-tracker.service';

describe('WorkTrackerService', () => {
  let service: WorkTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
