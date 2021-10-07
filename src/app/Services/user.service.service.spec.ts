import { TestBed } from '@angular/core/testing';

import { User.ServiceService } from './user.service.service';

describe('User.ServiceService', () => {
  let service: User.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
