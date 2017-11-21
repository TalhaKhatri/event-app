import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { Event } from '../interfaces/event.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  eventList: Observable<Event[]>;
  user: firebase.User = null;
  constructor(
    private authService: AuthenticationService,
    private dbService: DatabaseService,
    private router: Router) {}

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
    this.router.navigate(['dashboard/add']);
  }

  onEditEvent(event: Event) {
    console.log("Clicked event: ", event);
    this.router.navigate([`dashboard/edit`, event.id]);
  }

  onClickEvent(event: Event) {
    this.router.navigate([`dashboard/view`, event.id]);
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
