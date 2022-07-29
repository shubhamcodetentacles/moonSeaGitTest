import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BInprogrssComponent } from './b-inprogrss.component';

describe('BInprogrssComponent', () => {
  let component: BInprogrssComponent;
  let fixture: ComponentFixture<BInprogrssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BInprogrssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BInprogrssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
