import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: firebase.User = null;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) =>{
      if(!user) {
        this.router.navigate(['login']);
        this.user = null;
      } else {
        this.user = user;
      }
    })
  }

  logout(event) {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.user = null;
        console.log("User logged out.");
      });
  }
}
