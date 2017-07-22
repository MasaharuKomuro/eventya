/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StorylistRecordComponent } from './storylist-record.component';

describe('StorylistRecordComponent', () => {
  let component: StorylistRecordComponent;
  let fixture: ComponentFixture<StorylistRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorylistRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorylistRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
