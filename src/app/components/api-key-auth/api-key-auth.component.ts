import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '@app/local-storage.service';

@Component({
  selector: 'pt-api-key-auth',
  templateUrl: './api-key-auth.component.html',
  styleUrls: ['./api-key-auth.component.scss'],
})
export class ApiKeyAuthComponent implements OnInit {
  apiKeyControl = new FormControl();

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {}

  submit() {
    this.localStorageService.set('api_key', this.apiKeyControl.value);
    this.router.navigate(['']);
  }
}
