import { TestBed } from '@angular/core/testing';

import { InstalacionesServiceService } from './instalaciones.service.service';

describe('InstalacionesServiceService', () => {
  let service: InstalacionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstalacionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
