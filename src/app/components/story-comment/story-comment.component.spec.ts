import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule } from 'ngx-markdown';

import { BytesizePipe } from '@app/pipes/bytesize.pipe';

import { FileAttachmentPreviewComponent } from '../file-attachment-preview/file-attachment-preview.component';
import { StoryCommentComponent } from './story-comment.component';

describe('StoryCommentComponent', () => {
  let component: StoryCommentComponent;
  let fixture: ComponentFixture<StoryCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoryCommentComponent,
        FileAttachmentPreviewComponent,
        BytesizePipe,
      ],
      imports: [MarkdownModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
