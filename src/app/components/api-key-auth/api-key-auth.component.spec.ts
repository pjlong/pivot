import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyAuthComponent } from './api-key-auth.component';

describe('ApiKeyAuthComponent', () => {
  let component: ApiKeyAuthComponent;
  let fixture: ComponentFixture<ApiKeyAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyAuthComponent ]
    })
    .compileComponents();
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
