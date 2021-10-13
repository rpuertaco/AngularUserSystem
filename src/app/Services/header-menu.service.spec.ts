import { TestBed } from '@angular/core/testing';

import { HeaderMenuService } from './header-menu.service';

describe('HeaderMenuService', () => {
  let service: HeaderMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
