import { Component, Output, EventEmitter } from '@angular/core';
import { Event } from '../interfaces/event.interface';
@Component({
    selector:'add-event',
    styleUrls: ['./styles/add-event.component.scss'],
    template: `
        <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
            <label>
            Name
            <input type="text" name="name" ngModel>
            </label>
            <label>
            Venue
            <input type="text" name="venue" ngModel>
            </label>
            <label>
            Date
            <input type="date" name="date" ngModel>
            </label>
            <label>
            <div>Description</div>
            <textarea rows="6" cols="30" name="description" ngModel></textarea>
            </label>
            <button type="submit">
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
    constructor() {}

    onSubmit(event: Event) {
        console.log(event);
        this.submitted.emit(event);
    }

    onCancel() {
        this.cancel.emit(false);
    }
}