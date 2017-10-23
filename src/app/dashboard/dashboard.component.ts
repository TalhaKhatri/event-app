import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Observable<any[]>;
  constructor(
    db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    
  }

  logout() {
    this.afAuth.auth
      .signOut()
  }
}
