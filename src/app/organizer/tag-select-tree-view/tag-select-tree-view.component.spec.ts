import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectTreeViewComponent } from './tag-select-tree-view.component';

describe('TagSelectTreeViewComponent', () => {
  let component: TagSelectTreeViewComponent;
  let fixture: ComponentFixture<TagSelectTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSelectTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSelectTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
