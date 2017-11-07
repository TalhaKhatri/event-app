import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Event } from '../interfaces/event.interface';
@Injectable()
export class DatabaseService {

    constructor(
        private afStore: AngularFirestore
    ) {}

    getEvents(): Observable<Event[]> {
        return this.afStore.collection<Event>("events").snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Event;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }

    addEvent(event: Event) {
        return this.afStore.collection('events').add(event);
    }

    updateEvent(event: Event, id: string) {
        return this.afStore.collection('events')
            .doc(id)
            .update(event);
    }

    removeEvent(eventId: string) {
        return this.afStore.collection("events")
            .doc(eventId)
            .delete();
    }
}