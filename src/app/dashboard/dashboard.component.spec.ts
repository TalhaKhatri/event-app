import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import { Router } from '@angular/router';


import { DatabaseService } from '../services/database.service';
import { AuthenticationService } from '../services/authentication.service';

import { DashboardComponent } from './dashboard.component';
import { EventFormComponent } from './event/event-form.component';
import { EventListComponent } from './event/event-list.component';
import { AddEventComponent } from './event/add-event.component';
import { EditEventComponent } from './event/edit-event.component';
import { ViewEventComponent } from './event/view-event.component';

import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Event } from '../interfaces/event.interface';
import { User } from '../interfaces/user.interface';
import { routes } from './dashboard.module';

const user: User = {  
  uid: 234534534,
  displayName: "Test User",
  email: "test@email.com",
  password: "password"
};
const events: Event[] = [
  {
    id: "abcde",
    name: "Test Event",
    creator: "fghijkl",
    venue: "Test venue",
    date: "2017-20-28",
    description: "Test description",
  },
  {
    id: "abcdef",
    name: "Test Event 2",
    creator: "fghijkl",
    venue: "Test venue 2",
    date: "2017-20-28",
    description: "Test description 2",
  }
]

const MockDatabaseService = {
  getEvents(){
    return Observable.of(events);
  },
  addEvent(event){
    return Promise.resolve(event);
  }
}

const MockAuthService = {
  isLoggedIn(f: (u) => any){
    f(user);
  }
}

describe('DashboardComponent', () => {
  let location: Location;
  let router: Router;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataService: DatabaseService;
  let authService: AuthenticationService;
  let el: DebugElement;
  beforeEach(async(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        EventFormComponent,
        EventListComponent,
        AddEventComponent,
        EditEventComponent,
        ViewEventComponent
      ],
      imports: [ RouterTestingModule.withRoutes(routes), FormsModule ],
      providers: [ 
        { provide: DatabaseService, useValue: MockDatabaseService },
        { provide: AuthenticationService, useValue: MockAuthService },
      ]
    });
    dataService = bed.get(DatabaseService);
    authService = bed.get(AuthenticationService);
    bed.compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete event', () => {
    spyOn(component, 'handleDelete');
    el.query(By.css('event-list')).triggerEventHandler('deleted', events[0].id);
    fixture.detectChanges();
    expect(component.handleDelete).toHaveBeenCalledWith(events[0].id);
  });

  it('should update list of events', () => {
    component.eventList = null;
    component.update();
    expect(component.eventList).toEqual(Observable.of(events));
  })
});
