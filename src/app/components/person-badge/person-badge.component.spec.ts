import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { PersonBadgeComponent } from './person-badge.component';

describe('PersonBadgeComponent', () => {
  let component: PersonBadgeComponent;
  let fixture: ComponentFixture<PersonBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonBadgeComponent],
      imports: [NgbPopoverModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
