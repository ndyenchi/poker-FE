import { TestBed } from '@angular/core/testing';

import { GamePokerService } from './game-poker.service';

describe('GamePokerService', () => {
  let service: GamePokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
