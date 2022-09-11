import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingHistoryComponent } from './voting-history.component';

describe('VotingHistoryComponent', () => {
  let component: VotingHistoryComponent;
  let fixture: ComponentFixture<VotingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
