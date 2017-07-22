import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDetailModalComponent } from './story-detail-modal.component';

describe('StoryDetailModalComponent', () => {
  let component: StoryDetailModalComponent;
  let fixture: ComponentFixture<StoryDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
