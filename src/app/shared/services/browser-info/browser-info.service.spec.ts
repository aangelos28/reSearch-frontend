import { TestBed } from '@angular/core/testing';

import { BrowserInfoService } from './browser-info.service';

describe('BrowserInfoService', () => {
  let service: BrowserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
