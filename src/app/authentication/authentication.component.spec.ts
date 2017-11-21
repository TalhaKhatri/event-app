import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { AuthFormComponent } from './auth-form.component';
import { JoinFormComponent } from './join-form.component';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user.interface';
import { routes } from './authentication.module';

const user: User = {  uid: 234534534,
                      displayName: "Test User",
                      email: "test@email.com",
                      password: "password"  };

class MockAuth {
  isLoggedIn(a: (u) => any){
    a(user);
  }
  loginUser(user: User){
    return user;
  }
  createUser(user: User){
    return user;
  }
}

describe('AuthenticationComponent', () => {
  let location: Location;
  let router: Router;
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AuthenticationComponent,
        JoinFormComponent,
        AuthFormComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuth }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
