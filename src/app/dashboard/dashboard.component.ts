import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';
import * as firebase from 'firebase/app';

import { Event } from '../interfaces/event.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  addEvent: boolean = false;
  editEvent: boolean = false;
  viewEvent: boolean = false;
  eventList: Observable<Event[]>;
  user: firebase.User = null;
  event: Event = null;
  constructor(
    private authService: AuthenticationService,
    private dbService: DatabaseService) {}

  ngOnInit() {
    this.authService.isLoggedIn((user) => {
      if(user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.eventList = this.dbService.getEvents();
  }

  update() {
    this.eventList = this.dbService.getEvents();
  }

  onAddEvent() {
    this.addEvent = true;
  }

  onEditEvent(event: Event) {
    console.log("Clicked event: ", event);
    this.editEvent = true;
    this.event = event;
  }

  onClickEvent(event: Event) {
    this.viewEvent = true;
    this.event = event;
  }

  handleCancel(cancel: boolean) {
    this.addEvent = cancel;
    this.viewEvent = cancel;
    this.editEvent = cancel;
    this.event = null;
  }

  handleAddSubmit(event: Event) {
    event.creator = this.user.uid;
    event.creatorName = this.user.displayName;
    return this.dbService.addEvent(event)
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
    this.dbService.updateEvent(event, this.event.id)
      .then((docRef) => {
        console.log("Event updated: ", docRef);
        this.editEvent = false;
        this.event = null;
        this.update();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  handleDelete(eventId: string) {
      this.dbService.removeEvent(eventId)
      .then(() => {
        console.log("Successfully deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
