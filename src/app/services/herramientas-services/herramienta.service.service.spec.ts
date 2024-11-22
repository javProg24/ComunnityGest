import { TestBed } from '@angular/core/testing';

import { HerramientaServiceService } from './herramienta.service.service';

describe('HerramientaServiceService', () => {
  let service: HerramientaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerramientaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
