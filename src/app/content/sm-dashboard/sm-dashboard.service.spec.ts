import { TestBed } from '@angular/core/testing';

import { SmDashboardService } from './sm-dashboard.service';

describe('SmDashboardService', () => {
  let service: SmDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
