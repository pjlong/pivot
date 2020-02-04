import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule } from 'ngx-markdown';

import { StoryModalContentComponent } from './story-modal-content.component';

describe('StoryModalContentComponent', () => {
  let component: StoryModalContentComponent;
  let fixture: ComponentFixture<StoryModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryModalContentComponent],
      imports: [MarkdownModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
