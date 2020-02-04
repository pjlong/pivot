import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectNavComponent } from './project-nav.component';

describe('ProjectNavComponent', () => {
  let component: ProjectNavComponent;
  let fixture: ComponentFixture<ProjectNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectNavComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
