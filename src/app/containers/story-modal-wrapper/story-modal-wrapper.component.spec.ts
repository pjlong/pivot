import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryModalWrapperComponent } from './story-modal-wrapper.component';

describe('StoryModalWrapperComponent', () => {
  let component: StoryModalWrapperComponent;
  let fixture: ComponentFixture<StoryModalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryModalWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
