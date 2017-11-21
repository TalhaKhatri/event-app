import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../interfaces/event.interface';
import * as firebase from 'firebase/app';
@Component({
    selector: 'view-event',
    styleUrls: ['../styles/add-event.component.scss'],
    template: `
        <div class="main">
            <div class="events-container">
                <event-form
                [event]="event"
                [disable]="true"
                (cancel)="handleCancel($event)">
                </event-form>
            </div>
        </div>
    `
})
export class ViewEventComponent implements OnInit{
    event: Event;
    eventObs: Observable<Event>;
    eventId: string;
    user: firebase.User;
    constructor(private dbService: DatabaseService,
                private authService: AuthenticationService,
                private route: ActivatedRoute,
                private router: Router){}
    ngOnInit(){
        this.authService.isLoggedIn((user: firebase.User) => {
        if(user) {
            this.user = user;
            this.eventId = this.route.snapshot.paramMap.get('id');
            this.eventObs = this.dbService.getEvent(this.eventId);
            this.eventObs.subscribe(event => {
                this.event = event;
            });
        } else {
            this.user = null;
            this.router.navigate(['login']);
        }
        });
    }
    handleCancel(cancel: boolean) {
        this.router.navigate(['dashboard']);
    }
}