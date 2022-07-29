import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectModelComponent } from './disconnect-model.component';

describe('DisconnectModelComponent', () => {
  let component: DisconnectModelComponent;
  let fixture: ComponentFixture<DisconnectModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
