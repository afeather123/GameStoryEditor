import { TestBed, inject } from '@angular/core/testing';

import { VariableSelectService } from './variable-select.service';

describe('VariableSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariableSelectService]
    });
  });

  it('should be created', inject([VariableSelectService], (service: VariableSelectService) => {
    expect(service).toBeTruthy();
  }));
});
