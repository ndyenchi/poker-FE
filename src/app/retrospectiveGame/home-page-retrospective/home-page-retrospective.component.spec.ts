import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageRetrospectiveComponent } from './home-page-retrospective.component';

describe('HomePageRetrospectiveComponent', () => {
  let component: HomePageRetrospectiveComponent;
  let fixture: ComponentFixture<HomePageRetrospectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageRetrospectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageRetrospectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
