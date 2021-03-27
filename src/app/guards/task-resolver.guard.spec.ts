import { TestBed, async, inject } from '@angular/core/testing';

import { TaskResolverGuard } from './task-resolver.guard';

describe('TaskResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskResolverGuard]
    });
  });

  it('should ...', inject([TaskResolverGuard], (guard: TaskResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
