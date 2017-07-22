import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSelectTreeViewComponent } from './channel-select-tree-view.component';

describe('ChannelSelectTreeViewComponent', () => {
  let component: ChannelSelectTreeViewComponent;
  let fixture: ComponentFixture<ChannelSelectTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSelectTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSelectTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
