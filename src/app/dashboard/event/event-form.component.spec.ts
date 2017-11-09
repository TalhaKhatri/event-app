import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EventFormComponent } from './event-form.component';
import { FormsModule } from '@angular/forms';
import { Event } from '../../interfaces/event.interface';

describe('Event Form Component', () => {
    let bed;
    let el: DebugElement;
    let fixture: ComponentFixture<EventFormComponent>;
    let eventForm: EventFormComponent;
    beforeEach(async(() => {
        bed = TestBed.configureTestingModule({
            declarations:[ EventFormComponent ],
            imports: [ FormsModule ]
        })
        bed.compileComponents();
        fixture = TestBed.createComponent(EventFormComponent);
        el = fixture.debugElement;
        eventForm = fixture.componentInstance;
    }));

    it('should create the form', async(() => {
        expect(eventForm).toBeTruthy();
    }));

    it(`should emit event when 'cancel' is clicked`, async(() => {
        spyOn(eventForm, 'onCancel');
        eventForm.cancel.subscribe(cancel => expect(cancel).toBeFalsy());
        el.query(By.css('button#cancel')).triggerEventHandler('click', null);
        expect(eventForm.onCancel).toHaveBeenCalled();
    }));

    it(`should submit event only when form is filled`, async(() => {
        let event: Event = { name: null,
                             venue: null,
                             date: null,
                             description: null };
        eventForm.submitted.subscribe(e => expect(e).toEqual(event));                             
        expect(eventForm.onSubmit(event)).toBeFalsy();
        event.name = 'Test event';
        expect(eventForm.onSubmit(event)).toBeFalsy();
        event.venue = 'Venue';
        expect(eventForm.onSubmit(event)).toBeFalsy();
        event.date = '12-12-2017';
        expect(eventForm.onSubmit(event)).toBeTruthy();
    }));

    it(`should not submit if submit button is disabled`, async(() => {
        spyOn(eventForm, 'onSubmit');
        eventForm.disable = true;
        el.query(By.css('button#submit')).triggerEventHandler('click',null);
        expect(eventForm.onSubmit).not.toHaveBeenCalled();
    }));

    it(`should not allow submit button to be clicked more than once`, async(() => {
        let event: Event = { name: 'name',
                             venue: 'venue',
                             date: '12-12-2017',
                             description: 'desc' };
        eventForm.onSubmit(event);
        expect(eventForm.submit).toBeTruthy();
    }));
})
