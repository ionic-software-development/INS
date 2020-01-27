import { TestBed } from '@angular/core/testing';

import { NotificationHelperService } from './notification-helper.service';

describe('NotificationHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationHelperService = TestBed.get(NotificationHelperService);
    expect(service).toBeTruthy();
  });
});
