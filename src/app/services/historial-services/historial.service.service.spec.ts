import { TestBed } from '@angular/core/testing';

import { HistorialServiceService } from './historial.service.service';

describe('HistorialServiceService', () => {
  let service: HistorialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
