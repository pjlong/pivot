import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectNavComponent } from '@app/components/project-nav/project-nav.component';

import { ProjectRootComponent } from './project-root.component';

describe('ProjectRootComponent', () => {
  let component: ProjectRootComponent;
  let fixture: ComponentFixture<ProjectRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectRootComponent, ProjectNavComponent],
      providers: [],
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
