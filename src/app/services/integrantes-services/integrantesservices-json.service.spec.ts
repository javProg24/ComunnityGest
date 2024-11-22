import { TestBed } from '@angular/core/testing';

import { IntegrantesservicesJsonService } from './integrantesservices-json.service';

describe('IntegrantesservicesJsonService', () => {
  let service: IntegrantesservicesJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegrantesservicesJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
