import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Event } from '../interfaces/event.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  addEvent: boolean = false;
  editEvent: boolean = false;
  events: Observable<Event[]>;
  user: firebase.User = null;
  event: Event = null;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
    
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.events = this.db.collection<Event>("events").snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  update() {
    this.events = this.db.collection<Event>("events").snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  onAddEvent() {
    this.addEvent = true;
  }

  onEditEvent(event: Event) {
    this.editEvent = true;
    this.event = event;
  }

  handleAddCancel(cancel: boolean) {
    this.addEvent = cancel;
  }

  handleEditCancel(cancel: boolean) {
    this.editEvent = cancel;
    this.event = null;
  }

  handleAddSubmit(event: Event) {
    event.creator = this.user.uid;
    event.creatorName = this.user.displayName;
    this.db.collection('events')
      .add(event)
      .then((docRef) => {
        console.log("Event added: ", docRef);
        this.addEvent = false;
        this.update();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  handleEditSubmit(event: Event) {
    event.creator = this.user.uid;
    event.creatorName = this.user.displayName;
    this.db.collection('events')
      .doc(this.event.id)
      .update(event)
      .then((docRef) => {
        console.log("Event updated: ", docRef);
        this.editEvent = false;
        this.update();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  handleDelete(eventId: string) {
    this.db.collection("events")
      .doc(eventId)
      .delete()
      .then(() => {
        console.log("Successfully deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
