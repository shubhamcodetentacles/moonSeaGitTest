import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitBiasComponent } from './trait-bias.component';

describe('TraitBiasComponent', () => {
  let component: TraitBiasComponent;
  let fixture: ComponentFixture<TraitBiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitBiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitBiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
