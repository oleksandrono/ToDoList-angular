import { TestBed } from '@angular/core/testing';

import { TaskSeviceService } from './task-sevice.service';

describe('TaskSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskSeviceService = TestBed.get(TaskSeviceService);
    expect(service).toBeTruthy();
  });
});
