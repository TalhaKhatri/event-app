import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'add-event',
    template: `
        <event-form 
        (submitted)="handleSubmit($event)"
        (cancel)="handleCancel($event)">
        </event-form>
    `
})
export class AddEventComponent {
    @Output() submitted: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(){}

    handleSubmit(event: Event) {
        this.submitted.emit(event);
    }

    handleCancel(cancel: boolean) {
        this.cancel.emit(cancel);
    }
}