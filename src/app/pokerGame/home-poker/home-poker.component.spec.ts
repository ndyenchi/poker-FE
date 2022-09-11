import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePokerComponent } from './home-poker.component';

describe('HomePokerComponent', () => {
  let component: HomePokerComponent;
  let fixture: ComponentFixture<HomePokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
