import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'edit-event',
    template: `
        <event-form 
        (submitted)="handleSubmit($event)"
        (cancel)="handleCancel($event)"
        [event]="event">
        </event-form>
    `
})
export class EditEventComponent {
    @Output() submitted: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() event: Event;
    constructor(){}

    handleSubmit(event: Event) {
        this.submitted.emit(event);
    }

    handleCancel(cancel: boolean) {
        this.cancel.emit(cancel);
    }
}