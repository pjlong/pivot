import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BytesizePipe } from '@app/pipes/bytesize.pipe';

import { FileAttachmentPreviewComponent } from './file-attachment-preview.component';

describe('FileAttachmentPreviewComponent', () => {
  let component: FileAttachmentPreviewComponent;
  let fixture: ComponentFixture<FileAttachmentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileAttachmentPreviewComponent, BytesizePipe],
      providers: [NgbModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAttachmentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
