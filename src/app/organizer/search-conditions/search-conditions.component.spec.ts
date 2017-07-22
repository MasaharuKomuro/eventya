import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConditionsComponent } from './search-conditions.component';

describe('SearchConditionsComponent', () => {
  let component: SearchConditionsComponent;
  let fixture: ComponentFixture<SearchConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
