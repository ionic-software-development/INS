import { TestBed } from '@angular/core/testing';

import { ScrutineerServiceService } from './scrutineer-service.service';

describe('ScrutineerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrutineerServiceService = TestBed.get(ScrutineerServiceService);
    expect(service).toBeTruthy();
  });
});
