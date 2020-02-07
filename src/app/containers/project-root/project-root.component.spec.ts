import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { peopleStoreMockService } from '@app/__mocks__/people-store-mock.service';
import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { ProjectNavComponent } from '@app/components/project-nav/project-nav.component';
import { PeopleStoreService } from '@app/people-store.service';
import { ProjectMembershipsService } from '@app/resources/project-memberships.service';

import { ProjectRootComponent } from './project-root.component';

describe('ProjectRootComponent', () => {
  let component: ProjectRootComponent;
  let fixture: ComponentFixture<ProjectRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectRootComponent, ProjectNavComponent],
      providers: [
        {
          provide: ProjectMembershipsService,
          useValue: new ResourceMockService(),
        },
        { provide: PeopleStoreService, useValue: peopleStoreMockService },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
