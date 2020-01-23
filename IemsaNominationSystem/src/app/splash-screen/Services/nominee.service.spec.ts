import { TestBed } from '@angular/core/testing';

import { NomineeService } from './nominee.service';

describe('NomineeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NomineeService = TestBed.get(NomineeService);
    expect(service).toBeTruthy();
  });
});
