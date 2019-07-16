import { TestBed } from '@angular/core/testing';

import { ListServiceService } from './list-service.service';

describe('ListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListServiceService = TestBed.get(ListServiceService);
    expect(service).toBeTruthy();
  });
});
