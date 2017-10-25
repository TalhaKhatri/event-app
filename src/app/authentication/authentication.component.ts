import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '../interfaces/user.interface';
@Component({
    selector:'auth',
    styleUrls: ['./authentication.component.scss'],
    template:`
        <div>
            <div class="auth">
                <join-form
                (submitted)="createUser($event)">
                </join-form>
                <auth-form 
                (submitted)="loginUser($event)">
                </auth-form>
            </div>
        </div>
    `
})
export class AuthenticationComponent implements OnInit {
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) {}

    ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.router.navigate(['dashboard']);
      }
    })
  }

    loginUser(user: User) {
    console.log(user);
    this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.router.navigate(['dashboard']);
        console.log("User logged in.");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  createUser(user: User) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({
            displayName: user.displayName,
            photoURL: ""
        }).then(() => {
            console.log("Name updated.");
        });
        console.log("User created.");
        console.log(user);
      });
  }
  
}