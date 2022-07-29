import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPowersComponent } from './super-powers.component';

describe('SuperPowersComponent', () => {
  let component: SuperPowersComponent;
  let fixture: ComponentFixture<SuperPowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperPowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
