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
  events: Observable<any[]>;
  user: firebase.User = null;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
    this.events = db.collection('events').valueChanges();
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }

  onAddEvent() {
    this.addEvent = true;
  }

  handleCancel(event: boolean) {
    this.addEvent = event;
  }

  handleSubmit(event: Event) {
    event.creator = this.user.uid;
    event.creatorName = this.user.displayName;
    this.db.collection('events')
      .add(event)
      .then((docRef) => {
        console.log("Event added: ", docRef);
        this.addEvent = false;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

}
