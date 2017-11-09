import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Event } from '../../interfaces/event.interface';
@Component({
    selector:'event-form',
    styleUrls: ['../styles/add-event.component.scss'],
    template: `
        <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
            <label>
            Name
            <input  id="name"
                    type="text" 
                    name="name" 
                    [ngModel]="event?.name"
                    [disabled]="disable">
            </label>
            <label>
            Venue
            <input  type="text" 
                    name="venue" 
                    [ngModel]="event?.venue"
                    [disabled]="disable">
            </label>
            <label>
            Date
            <input  type="date" 
                    name="date" 
                    [ngModel]="event?.date"
                    [disabled]="disable">                    
            </label>
            <label>
            <div>Description</div>
            <textarea rows="6" 
                    cols="30" 
                    name="description" 
                    [ngModel]="event?.description"
                    [disabled]="disable">                    
            </textarea>
            </label>
            <button id="submit"
                    type="submit"
                    [disabled]="submit || disable">
            Submit
            </button>
            <button id="cancel"
                    type="button" 
                    (click)="onCancel()">
            Cancel
            </button>
        </form>
    `
})
export class EventFormComponent{
    @Output() submitted: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() event: Event;
    @Input() disable: boolean = false;

    submit: boolean = false;
    constructor() {}

    onSubmit(event: Event) {
        if(event.name &&
           event.venue &&
           event.date &&
           !this.submit){
            console.log(event);
            this.submit = true;
            this.submitted.emit(event);
            return true;
        }
        return false;
    }

    onCancel() {
        this.cancel.emit(false);
    }
}