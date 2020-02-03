import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '@app/local-storage.service';

enum ApiKeyAuthComponentState {
  Edit,
  View,
}

@Component({
  selector: 'pt-api-key-auth',
  templateUrl: './api-key-auth.component.html',
  styleUrls: ['./api-key-auth.component.scss'],
})
export class ApiKeyAuthComponent implements OnInit {
  apiKeyControl = new FormControl();
  existingApiKey: string;

  private currentState: ApiKeyAuthComponentState;

  get isEditState() {
    return this.currentState === ApiKeyAuthComponentState.Edit;
  }

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.existingApiKey = this.localStorageService.get('api_key');
    if (!this.existingApiKey) {
      this.currentState = ApiKeyAuthComponentState.Edit;
    } else {
      this.currentState = ApiKeyAuthComponentState.View;
    }
  }

  submit() {
    this.localStorageService.set('api_key', this.apiKeyControl.value);
    this.router.navigate(['']);
  }

  cancelEdit() {
    this.currentState = ApiKeyAuthComponentState.View;
  }

  editApiKey() {
    this.apiKeyControl.setValue(this.existingApiKey);
    this.currentState = ApiKeyAuthComponentState.Edit;
  }
}
