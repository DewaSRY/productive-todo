import { TestBed } from '@angular/core/testing';

import { UniqPropertyService } from './uniq-property.service';

describe('UniqPropertyService', () => {
  let service: UniqPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
