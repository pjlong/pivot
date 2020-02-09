import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'pt-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
})
export class ProjectRootComponent implements OnInit, OnDestroy {
  projectId: string;
  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
