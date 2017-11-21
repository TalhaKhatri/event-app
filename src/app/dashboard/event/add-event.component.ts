import { Component, Output, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { DatabaseService } from '../../services/database.service';
import * as firebase from 'firebase/app';
import { Event } from '../../interfaces/event.interface';
import { Router } from '@angular/router';
@Component({
    selector: 'add-event',
    styleUrls: ['../styles/add-event.component.scss'],
    template: `
        <div class="main">
            <div class="events-container">
                <event-form 
                (submitted)="handleSubmit($event)"
                (cancel)="handleCancel($event)">
                </event-form>
            </div>
        </div>
        
    `
})
export class AddEventComponent implements OnInit{
    user: firebase.User;
    constructor(private authService: AuthenticationService,
                private service: DatabaseService,
                private router: Router ){}

    ngOnInit() {
        this.authService.isLoggedIn((user) => {
            if(user) {
                this.user = user;
            } else {
                this.user = null;
                this.router.navigate(['login']);
            }
        });
    }
    handleSubmit(event: Event) {
        event.creator = this.user.uid;
        event.creatorName = this.user.displayName;
        this.service.addEvent(event)
            .then(() => {
                this.router.navigate(['dashboard']);
            })
            .catch((error) => {
                console.log('Adding event', error);
            });
    }
    handleCancel(cancel: boolean) {
        this.router.navigate(['dashboard']);
    }
}