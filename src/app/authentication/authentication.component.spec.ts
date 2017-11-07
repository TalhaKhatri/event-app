import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { AuthFormComponent } from './auth-form.component';
import { JoinFormComponent } from './join-form.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user.interface';

const user: User = {  uid: 234534534,
                      displayName: "Test User",
                      email: "test@email.com",
                      password: "password"  };

class MockAuth {
  loginUser(user: User){
    return user;
  }
  createUser(user: User){
    return user;
  }
}

describe('AuthenticationComponent', () => {
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

  it('loginUser should run when called', async(() => {
    spyOn(component, 'loginUser').and.returnValue(Promise.resolve(true));
    component.loginUser(user).then((result) => {
      expect(result).toBe(true);
    })
  }));

  it('createUser should run when called', async(() => {
    spyOn(component, 'createUser').and.returnValue(Promise.resolve(user));
    component.createUser(user).then((result) => {
      expect(result).toBe(user);
    })
  }));
});
