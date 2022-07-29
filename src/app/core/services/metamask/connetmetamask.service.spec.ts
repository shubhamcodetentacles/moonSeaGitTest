import { TestBed } from '@angular/core/testing';

import { ConnetmetamaskService } from './connetmetamask.service';

describe('ConnetmetamaskService', () => {
  let service: ConnetmetamaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnetmetamaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
