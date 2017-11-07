import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'view-event',
    template: `
        <event-form
        [event]="event"
        [disable]="true"
        (cancel)="handleCancel($event)">
        </event-form>
    `
})
export class ViewEventComponent {
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() event: Event;
    constructor(){}

    handleCancel(cancel: boolean) {
        this.cancel.emit(cancel);
    }
}