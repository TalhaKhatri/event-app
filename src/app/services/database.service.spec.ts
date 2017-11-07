import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Event } from '../interfaces/event.interface';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

const event: Event = {
    id: "abcde",
    name: "Test Event",
    creator: "fghijkl",
    venue: "Test venue",
    date: "2017-20-28",
    description: "Test description",
};

function collection<T>(name: string) {
    return {
        add(obj){
            return Promise.resolve(obj);
        },
        snapshotChanges(){
            return {
                map(f: () => any){
                    return Observable.of([event, event]);
                }
            }
        },
        doc(id){
            return {
                update(){
                    return Promise.resolve(event);
                },
                delete(){
                    return Promise.resolve();
                }
            }
        }
    }
}
const mockAngularStore: any = { collection };


describe('DatabaseService', () => {
    let service: DatabaseService;
    let angularStore: AngularFirestore;

    beforeEach(async(() => {
        const bed = TestBed.configureTestingModule({
            imports: [],
            providers: [
                DatabaseService,
                { provide: AngularFirestore, useValue: mockAngularStore }
            ]
        });
        angularStore = bed.get(AngularFirestore);
        service = bed.get(DatabaseService);
    }));

    it('should be created', async(() => {
        expect(service).toBeTruthy();
    }));

    it('should add a new event', async(() => {
        service.addEvent(event).then((docRef) => expect(docRef).toBeDefined());
    }));

    it('should get events', async(() => {
        service.getEvents().subscribe((result) => {
            expect(result.length).toBe(2);
            expect(result).toEqual([event, event]);
        })
    }));

    it('should update an event', async(() => {
        service.updateEvent(event, event.id).then((docRef) => expect(docRef).toBeDefined());
    }));

    it('should delete an event', async(() => {
        service.removeEvent(event.id).catch((error) => expect(error).toBeUndefined());
    }));
});
