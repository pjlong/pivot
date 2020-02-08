import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { CurrentUserComponent } from '@app/components/current-user/current-user.component';
import { PivotalAPIService } from '@app/pivotal-api.service';
import { MeService } from '@app/resources/me.service';
import { ProjectService, ProjectQuery } from '@app/store/project';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const projectMockService = {
    getProjectDetails: jest.fn(() => new Observable()),
    getAll: jest.fn(() => new Observable()),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, CurrentUserComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PivotalAPIService, useValue: pivotalAPIMockService },
        { provide: ProjectService, useValue: projectMockService },
        ProjectQuery,
        { provide: MeService, useValue: new ResourceMockService() },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
