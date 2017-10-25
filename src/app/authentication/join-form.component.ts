import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';

@Component({
  selector: 'join-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <h3>Create account</h3>
        <label>
            Display name
            <input type="text" name="displayName" ngModel>
        </label>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <button type="submit">
          Join us!
        </button>
      </form>
    </div>
  `
})
export class JoinFormComponent {
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  onSubmit(user: User) {
    this.submitted.emit(user);
  }
}