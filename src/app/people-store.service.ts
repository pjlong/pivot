import { Injectable } from '@angular/core';

import { Person } from './resources';

@Injectable({
  providedIn: 'root',
})
export class PeopleStoreService {
  private peopleMap: { [key: string]: Person } = {};

  constructor() {}

  getById(personId: string | number): Person {
    return this.peopleMap[personId.toString()];
  }

  getByIds(personIds: (string | number)[]): Person[] {
    return personIds.map(id => this.peopleMap[id.toString()]);
  }
}
