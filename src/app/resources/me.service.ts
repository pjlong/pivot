import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PivotalAPIService } from '../pivotal-api.service';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private _me$ = new BehaviorSubject<any>(null);

  readonly me$ = this._me$.asObservable().pipe(filter(me => me !== null));

  constructor(private pivotalAPI: PivotalAPIService) { }

  get() {
    return this._get();
  }

  private _get() {
    const req = this.pivotalAPI.get('/me');
    req.subscribe({
      next: me => {
        this._me$.next(me);
      }
    });
    return req;
  }
}
