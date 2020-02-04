import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { localStorageMockService } from '@app/__mocks__/local-storage-mock.service';
import { LocalStorageService } from '@app/local-storage.service';
import { ObscurePipe } from '@app/pipes/obscure.pipe';

import { ApiKeyAuthComponent } from './api-key-auth.component';

describe('ApiKeyAuthComponent', () => {
  let component: ApiKeyAuthComponent;
  let fixture: ComponentFixture<ApiKeyAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApiKeyAuthComponent, ObscurePipe],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: LocalStorageService, useValue: localStorageMockService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
