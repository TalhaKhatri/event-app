import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '../interfaces/user.interface';
@Component({
    selector:'auth',
    template:`
        <div>
            <div class="auth">
                <auth-form
                    (submitted)="createUser($event)">
                    <h3>Create account</h3>
                </auth-form>
                <auth-form 
                    (submitted)="loginUser($event)">
                    <h3>Login</h3>
                </auth-form>
            </div>
            <!-- <button (click)="logout($event)">Logout</button> -->
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
        console.log("User created.");
        console.log(user);
      });
  }
  logout(event) {
    this.afAuth.auth
      .signOut()
      .then(() => {
        console.log("User logged out.");
      });
  }
}