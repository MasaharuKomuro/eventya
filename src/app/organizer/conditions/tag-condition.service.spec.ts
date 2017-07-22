import { TestBed, inject } from '@angular/core/testing';

import { TagConditionService } from './tag-condition.service';

describe('TagConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagConditionService]
    });
  });

  it('should ...', inject([TagConditionService], (service: TagConditionService) => {
    expect(service).toBeTruthy();
  }));
});
