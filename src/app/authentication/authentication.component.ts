import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
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
export class AuthenticationComponent implements OnInit{
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    ngOnInit(){
        this.authService.isLoggedIn((user) => {
            if(user){
                this.router.navigate(['dashboard']);
            }
        });
    }

    loginUser(user: User) {
        return this.authService.loginUser(user);
    }
  
    createUser(user: User) {
        return this.authService.createUser(user);
    }
  
}