import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Event } from '../../interfaces/event.interface';
@Component({
    selector: 'event-list',
    styleUrls: ['../styles/event-list.component.scss'],
    template: `
        <ul>
            <li class="text" *ngFor="let event of events | async;">
                <span (click)="onClick(event)">{{ event.name }} | on: {{ event?.date }} | at {{ event?.venue }}</span>
                <i class="material-icons edit" *ngIf="event?.creator===user.uid" (click)="onEdit(event)">edit</i>
                <i class="material-icons delete" *ngIf="event?.creator===user.uid" (click)="onDelete(event)">delete</i>
            </li>
        </ul>
    `
})
export class EventListComponent {
    @Input() events: Observable<Event[]>;
    @Input() user: firebase.User;
    @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
    @Output() editted: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();

    constructor() {

    }

    onDelete(event: Event) {
        this.deleted.emit(event.id);
    }

    onEdit(event: Event) {
        this.editted.emit(event);
        console.log(event);
    }

    onClick(event: Event) {
        this.clicked.emit(event);
        console.log(event);
    }
}