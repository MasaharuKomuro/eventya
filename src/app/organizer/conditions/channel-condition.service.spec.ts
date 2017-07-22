import { TestBed, inject } from '@angular/core/testing';

import { ChannelConditionService } from './channel-condition.service';

describe('ChannelConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelConditionService]
    });
  });

  it('should ...', inject([ChannelConditionService], (service: ChannelConditionService) => {
    expect(service).toBeTruthy();
  }));
});
