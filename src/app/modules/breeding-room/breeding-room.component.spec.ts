import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedingRoomComponent } from './breeding-room.component';

describe('BreedingRoomComponent', () => {
  let component: BreedingRoomComponent;
  let fixture: ComponentFixture<BreedingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedingRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
