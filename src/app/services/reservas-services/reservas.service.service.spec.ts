import { TestBed } from '@angular/core/testing';

import { ReservasServiceService } from './reservas.service.service';

describe('ReservasServiceService', () => {
  let service: ReservasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
