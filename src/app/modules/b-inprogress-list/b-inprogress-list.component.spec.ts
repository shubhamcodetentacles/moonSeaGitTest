import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BInprogressListComponent } from './b-inprogress-list.component';

describe('BInprogressListComponent', () => {
  let component: BInprogressListComponent;
  let fixture: ComponentFixture<BInprogressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BInprogressListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BInprogressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
