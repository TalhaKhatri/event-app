import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { HomeComponent } from './home.component';
import { AuthenticationService } from './services/authentication.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { Router } from '@angular/router';
import { routes } from './app.module';
import { User } from './interfaces/user.interface';

const user: User = {  
  uid: 234534534,
  displayName: "Test User",
  email: "test@email.com",
  password: "password"
};

let supplyUser = true;

const MockAuthService = {
  isLoggedIn(f: (u) => any){
    if(supplyUser)
      f(user);
    else
      f(null);
  },
  logOut(){
    return Promise.resolve();
  }
}

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let authService: AuthenticationService;
  let app: AppComponent;
  let el: DebugElement;
  let bed;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    bed = TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: AuthenticationService, useValue: MockAuthService }
      ]
    });
    bed.compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    authService = TestBed.get(AuthenticationService);
    fixture = TestBed.createComponent(AppComponent);
    el = fixture.debugElement;
    app = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Event App'`, async(() => {
    expect(app.title).toEqual('Event App');
  }));

  describe('If user is not signed in', () => {
    
    beforeEach(async(() => {
      supplyUser = false;
      bed.compileComponents();
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    }));
    
    it(`should navigate to 'login' page`, async(() => {
      router.navigate(['login']);
      expect(location.path()).toBe('/login');
    }))

    it(`should not display 'logout' button`, async(() => {
      expect(el.query(By.css('button'))).toBeNull();
    }))

    afterEach(async(() => {
      supplyUser = true;
    }));

  })
  
});
