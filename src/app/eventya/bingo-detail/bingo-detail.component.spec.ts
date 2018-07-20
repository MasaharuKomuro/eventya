import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoDetailComponent } from './bingo-detail.component';

describe('BingoDetailComponent', () => {
  let component: BingoDetailComponent;
  let fixture: ComponentFixture<BingoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
