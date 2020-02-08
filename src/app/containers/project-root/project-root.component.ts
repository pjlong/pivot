import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import {
  ProjectMembershipsService,
  ProjectMembershipResponse,
} from '@app/resources/project-memberships.service';

@Component({
  selector: 'pt-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
})
export class ProjectRootComponent implements OnInit, OnDestroy {
  projectId: string;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private projectMembershipService: ProjectMembershipsService,
    private peopleStore: PeopleStoreService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
      this.projectMembershipService.get(this.projectId);
    });

    this.projectMembershipService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((memberships: ProjectMembershipResponse[]) => {
        this.peopleStore.setPeopleFromMemberships(memberships);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
