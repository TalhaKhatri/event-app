import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'event-list',
    styleUrls: ['./styles/event-list.component.scss'],
    template: `
        <ul>
            <li class="text" *ngFor="let event of events | async">
                {{ event.name }} <span *ngIf="event?.creatorName">by {{ event?.creatorName }}</span> | on: {{ event.date }} | at {{ event.venue }}
            </li>
        </ul>
    `
})
export class EventListComponent {
    @Input() events: Observable<any>[];
    constructor() {

    }
}