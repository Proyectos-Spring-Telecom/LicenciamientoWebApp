import { TestBed } from '@angular/core/testing';

import { AlumbradoService } from './alumbrado.service';

describe('AlumbradoService', () => {
  let service: AlumbradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumbradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
