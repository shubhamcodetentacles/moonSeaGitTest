import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplySuperLikeComponent } from './reply-super-like.component';

describe('ReplySuperLikeComponent', () => {
  let component: ReplySuperLikeComponent;
  let fixture: ComponentFixture<ReplySuperLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplySuperLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplySuperLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
