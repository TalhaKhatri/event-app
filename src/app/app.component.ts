import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) =>{
      if(!user) {
        this.router.navigate(['login']);
      }
    })
  }
}
