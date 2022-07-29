import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSelectComponent } from './target-select.component';

describe('TargetSelectComponent', () => {
  let component: TargetSelectComponent;
  let fixture: ComponentFixture<TargetSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
