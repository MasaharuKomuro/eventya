import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSelectModalComponent } from './site-select-modal.component';

describe('SiteSelectModalComponent', () => {
  let component: SiteSelectModalComponent;
  let fixture: ComponentFixture<SiteSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
