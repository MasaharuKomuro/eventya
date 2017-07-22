/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditareaComponent } from './editarea.component';

describe('EditareaComponent', () => {
  let component: EditareaComponent;
  let fixture: ComponentFixture<EditareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
