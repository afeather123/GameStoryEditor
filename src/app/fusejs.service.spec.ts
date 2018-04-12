import { TestBed, inject } from '@angular/core/testing';

import { FusejsService } from './fusejs.service';

describe('FusejsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FusejsService]
    });
  });

  it('should be created', inject([FusejsService], (service: FusejsService) => {
    expect(service).toBeTruthy();
  }));
});
