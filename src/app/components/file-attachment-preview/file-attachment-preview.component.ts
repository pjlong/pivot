import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FileAttachmentResponse } from '@app/resources/story-comments.service';

@Component({
  selector: 'pt-file-attachment-preview',
  templateUrl: './file-attachment-preview.component.html',
  styleUrls: ['./file-attachment-preview.component.scss'],
})
export class FileAttachmentPreviewComponent {
  @ViewChild('attachmentModal', { static: true }) attachmentModal: TemplateRef<
    NgbModal
  >;
  @Input() attachment: FileAttachmentResponse;

  constructor(private ngbModal: NgbModal) {}

  openAttachmentImageModal(): void {
    this.ngbModal.open(this.attachmentModal, { size: 'xl' });
  }
}
