import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../interfaces/user.interface';

const user: User = {
    uid: 234534534,
    displayName: "Test User",
    email: "test@email.com",
    password: "password"
};

const auth: any = {
    createUserWithEmailAndPassword(email: string, password: string) {
        return Promise.resolve(true);
    },
    onAuthStateChanged(action: (a: any) => any) {
        action(user);
        return true;
    },
    signOut() {}
};
const mockAngularAuth: any = { auth };


describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let angularAuth: AngularFireAuth;

    beforeEach(async(() => {
        const bed = TestBed.configureTestingModule({
            imports: [],
            providers: [
                AuthenticationService,
                { provide: AngularFireAuth, useValue: mockAngularAuth }
            ]
        });
        angularAuth = bed.get(AngularFireAuth);
        service = bed.get(AuthenticationService);
    }));

    it('should be created', async(() => {
        expect(service).toBeTruthy();
    }));

    it('should create the new user', async(() => {
        spyOn(angularAuth.auth, 'createUserWithEmailAndPassword')
            .and.returnValue(Promise.resolve(false));
        service.createUser(user).then((userObj) => expect(userObj).toBe(user))
    }));

    it('should sign the user out', async(() => {
        spyOn(angularAuth.auth, 'signOut')
            .and.returnValue(Promise.resolve(true));
        service.logOut().then((result) => expect(result).toBe(true))
    }));

    it('should check authentication and pass in the current user', async(() => {
        spyOn(angularAuth.auth, 'onAuthStateChanged').and.returnValue(true);
        expect(service.isLoggedIn((userObj) => expect(userObj).toBe(user))).toBe(true);
    }));
});
