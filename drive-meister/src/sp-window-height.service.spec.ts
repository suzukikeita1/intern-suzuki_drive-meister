import { TestBed } from '@angular/core/testing';

import { SpWindowHeightService } from './sp-window-height.service';

describe('SpWindowHeightService', () => {
  let service: SpWindowHeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpWindowHeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
