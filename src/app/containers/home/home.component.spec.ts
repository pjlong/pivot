import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { CurrentUserComponent } from '@app/components/current-user/current-user.component';
import { MeService } from '@app/resources/me.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, CurrentUserComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: MeService, useValue: new ResourceMockService() }],
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
