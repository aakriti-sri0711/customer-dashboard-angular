import { TestBed, inject } from '@angular/core/testing';

import { ApiTalkService } from './api-talk.service';

describe('ApiTalkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTalkService]
    });
  });

  it('should be created', inject([ApiTalkService], (service: ApiTalkService) => {
    expect(service).toBeTruthy();
  }));
});
