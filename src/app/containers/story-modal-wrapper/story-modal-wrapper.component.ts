import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StoryQuery, Story } from '@app/store/story';

@Component({
  selector: 'pt-story-modal-wrapper',
  templateUrl: './story-modal-wrapper.component.html',
  styleUrls: ['./story-modal-wrapper.component.scss'],
})
export class StoryModalWrapperComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: TemplateRef<NgbModal>;
  @Output() modalOpenClick = new EventEmitter();
  story: Story;
  loading: boolean;
  private destroy$ = new Observable();

  constructor(private storyQuery: StoryQuery, private ngbModal: NgbModal) {}

  ngOnInit(): void {
    this.storyQuery
      .selectActive()
      .pipe(takeUntil(this.destroy$))
      .subscribe((activeStory: Story) => {
        this.story = activeStory;
      });

    this.storyQuery.activeLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });
  }

  openModal(): void {
    // this.storyService.focusStory(story);
    this.modalOpenClick.emit();

    if (this.ngbModal.hasOpenModals()) {
      this.ngbModal.dismissAll();
    }

    this.ngbModal.open(this.modal, { size: 'xl', scrollable: true });
  }
}
