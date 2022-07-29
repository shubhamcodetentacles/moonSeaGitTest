import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftSelectComponent } from './nft-select.component';

describe('NftSelectComponent', () => {
  let component: NftSelectComponent;
  let fixture: ComponentFixture<NftSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
