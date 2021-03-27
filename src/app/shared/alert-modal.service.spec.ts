import { TestBed, inject } from '@angular/core/testing';

import { AlertModalService } from './alert-modal.service';

describe('AlertModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertModalService]
    });
  });

  it('should be created', inject([AlertModalService], (service: AlertModalService) => {
    expect(service).toBeTruthy();
  }));
});
