import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedOutcomeComponent } from './breed-outcome.component';

describe('BreedOutcomeComponent', () => {
  let component: BreedOutcomeComponent;
  let fixture: ComponentFixture<BreedOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
