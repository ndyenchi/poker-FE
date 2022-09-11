import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNameGameComponent } from './create-name-game.component';

describe('CreateNameGameComponent', () => {
  let component: CreateNameGameComponent;
  let fixture: ComponentFixture<CreateNameGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNameGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNameGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
