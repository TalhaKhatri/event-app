//angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
//user modules
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardModule } from './dashboard/dashboard.module';
//environment vars
import { environment } from '../environments/environment';
//components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { HomeComponent } from './home.component';
//services
import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';


 export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationModule,
    DashboardModule
  ],
  providers: [
    AuthenticationService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }