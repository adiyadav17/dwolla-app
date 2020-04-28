import { TestBed } from '@angular/core/testing';

import { JourneysService } from './journeys.service';

describe('JourneysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JourneysService = TestBed.get(JourneysService);
    expect(service).toBeTruthy();
  });
});
