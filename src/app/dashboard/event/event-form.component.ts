import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Event } from '../../interfaces/event.interface';
@Component({
    selector:'event-form',
    styleUrls: ['../styles/add-event.component.scss'],
    template: `
        <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
            <label>
            Name
            <input type="text" name="name" [ngModel]="event?.name">
            </label>
            <label>
            Venue
            <input type="text" name="venue" [ngModel]="event?.venue">
            </label>
            <label>
            Date
            <input type="date" name="date" [ngModel]="event?.date">
            </label>
            <label>
            <div>Description</div>
            <textarea rows="6" 
                    cols="30" 
                    name="description" 
                    [ngModel]="event?.description">
            </textarea>
            </label>
            <button type="submit" [disabled]="submit">
            Submit
            </button>
            <button type="button" (click)="onCancel()">
            Cancel
            </button>
        </form>
    `
})
export class EventFormComponent{
    @Output() submitted: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() event: Event;
    submit: boolean = false;
    constructor() {}

    onSubmit(event: Event) {
        console.log(event);
        this.submit = true;
        this.submitted.emit(event);
    }

    onCancel() {
        this.cancel.emit(false);
    }
}