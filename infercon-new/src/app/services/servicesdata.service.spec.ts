import { TestBed } from '@angular/core/testing';

import { ServicesdataService } from './servicesdata.service';

describe('ServicesdataService', () => {
  let service: ServicesdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
