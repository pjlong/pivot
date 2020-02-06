import { Injectable } from '@angular/core';

import {
  PersonResponse,
  ProjectMembershipResponse,
} from './resources/project-memberships.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleStoreService {
  private people: PersonResponse[];
  private peopleMap: { [key: string]: PersonResponse } = {};

  constructor() {}

  setPeopleFromMemberships(memberships: ProjectMembershipResponse[]): void {
    this.people = memberships.map(({ person }) => {
      this.peopleMap[person.id] = person;
      return person;
    });
  }

  getById(personId: string | number): PersonResponse {
    return this.peopleMap[personId.toString()];
  }

  getByIds(personIds: (string | number)[]): PersonResponse[] {
    return personIds.map(id => this.peopleMap[id.toString()]);
  }
}
