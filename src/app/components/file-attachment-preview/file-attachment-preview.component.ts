import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FileAttachment } from '@store/story';

@Component({
  selector: 'pt-file-attachment-preview',
  templateUrl: './file-attachment-preview.component.html',
  styleUrls: ['./file-attachment-preview.component.scss'],
})
export class FileAttachmentPreviewComponent {
  @ViewChild('attachmentModal', { static: true }) attachmentModal: TemplateRef<
    NgbModal
  >;
  @Input() attachment: FileAttachment;

  constructor(private ngbModal: NgbModal) {}

  openAttachmentImageModal(): void {
    this.ngbModal.open(this.attachmentModal, { size: 'xl' });
  }
}
