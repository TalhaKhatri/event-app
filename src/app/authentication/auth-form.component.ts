import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  `
})
export class AuthFormComponent {
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  onSubmit(user: User) {
    this.submitted.emit(user);
  }
}