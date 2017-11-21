import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../interfaces/event.interface';
import * as firebase from 'firebase/app';
@Component({
    selector: 'edit-event',
    styleUrls: ['../styles/add-event.component.scss'],
    template: `
        <div class="main">
            <div class="events-container">
                <event-form 
                (submitted)="handleSubmit($event)"
                (cancel)="handleCancel($event)"
                [event]="event"
                [disable]="disable">
                </event-form>
            </div>
        </div>
    `
})
export class EditEventComponent implements OnInit{
    eventObs: Observable<Event>;
    eventId: string;
    event: Event;
    user: firebase.User;
    disable: boolean = true;
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
                this.disable = false;
                if(event.creator !== user.uid){
                    this.router.navigate(['dashboard']);
                }
            });
        } else {
            this.user = null;
            this.router.navigate(['login']);
        }
        });
    }
    handleSubmit(submittedEvent: Event) {
        console.log('Recieved submit');
        submittedEvent.creator = this.user.uid;
        submittedEvent.creatorName = this.user.displayName;
        console.log('this is done');
        this.dbService.updateEvent(submittedEvent, this.eventId)
        .then(() => {
            console.log('Update success');
            this.router.navigate(['dashboard']);
        })
        .catch((error) => {
            console.log("Submitting edit event", error);
        });
    }

    handleCancel(cancel: boolean) {
        //this.cancel.emit(cancel);
        this.router.navigate(['dashboard']);
    }
}