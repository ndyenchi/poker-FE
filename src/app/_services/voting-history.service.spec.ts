import { TestBed } from '@angular/core/testing';

import { VotingHistoryService } from './voting-history.service';

describe('VotingHistoryService', () => {
  let service: VotingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
