import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user.interface';
@Component({
    selector:'auth',
    styleUrls: ['./authentication.component.scss'],
    template:`
        <div>
            <div class="auth">
                <join-form
                (submitted)="createUser($event)">
                </join-form>
                <auth-form 
                (submitted)="loginUser($event)">
                </auth-form>
            </div>
        </div>
    `
})
export class AuthenticationComponent {
    constructor(
        private authService: AuthenticationService
    ) {}

    loginUser(user: User) {
        return this.authService.loginUser(user);
    }
  
    createUser(user: User) {
        return this.authService.createUser(user);
    }
  
}