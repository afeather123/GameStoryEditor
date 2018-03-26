import { TestBed, inject } from '@angular/core/testing';

import { InteractableService } from './interactable.service';

describe('InteractableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractableService]
    });
  });

  it('should be created', inject([InteractableService], (service: InteractableService) => {
    expect(service).toBeTruthy();
  }));
});
