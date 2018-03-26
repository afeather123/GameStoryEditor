import { TestBed, inject } from '@angular/core/testing';

import { LoadJsonService } from './load-json.service';

describe('LoadJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadJsonService]
    });
  });

  it('should be created', inject([LoadJsonService], (service: LoadJsonService) => {
    expect(service).toBeTruthy();
  }));
});
