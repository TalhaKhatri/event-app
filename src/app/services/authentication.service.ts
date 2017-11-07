import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthenticationService {

    constructor(
        private afAuth: AngularFireAuth
    ) {}

    isLoggedIn(action: (user) => any) {
        return this.afAuth.auth.onAuthStateChanged(action);
    }

    loginUser(user: User) {
        console.log(user);
        return this.afAuth.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            console.log("User logged in.");
            console.log(user);
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    }

    createUser(user: User) {
        return this.afAuth.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
            if(result){
                firebase.auth().currentUser.updateProfile({
                    displayName: user.displayName,
                    photoURL: ""
                }).then(() => {
                    console.log("Name updated.");
                    return true;
                }).catch((error) => {
                    console.log(error);
                })
            }
            console.log("User created.");
            console.log(user);
            return user;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    logOut() {
        return this.afAuth.auth
        .signOut()
        .then(() => {
            console.log("User logged out.");
            return true;
        });
    }
}