import { TestBed } from '@angular/core/testing';

import { ToastyServiceService } from './toasty-service.service';

describe('ToastyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastyServiceService = TestBed.get(ToastyServiceService);
    expect(service).toBeTruthy();
  });
});
