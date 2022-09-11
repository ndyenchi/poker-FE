import { TestBed } from '@angular/core/testing';

import { IssuesPokerService } from './issues-poker.service';

describe('IssuesPokerService', () => {
  let service: IssuesPokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesPokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
