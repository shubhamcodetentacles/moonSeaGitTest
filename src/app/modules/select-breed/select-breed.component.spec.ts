import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBreedComponent } from './select-breed.component';

describe('SelectBreedComponent', () => {
  let component: SelectBreedComponent;
  let fixture: ComponentFixture<SelectBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBreedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
