import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitBiasDialogComponent } from './trait-bias-dialog.component';

describe('TraitBiasDialogComponent', () => {
  let component: TraitBiasDialogComponent;
  let fixture: ComponentFixture<TraitBiasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitBiasDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitBiasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
