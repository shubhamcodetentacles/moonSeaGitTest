import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTargetComponent } from './selected-target.component';

describe('SelectedTargetComponent', () => {
  let component: SelectedTargetComponent;
  let fixture: ComponentFixture<SelectedTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
