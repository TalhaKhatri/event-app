import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { AuthFormComponent } from './auth-form.component';
import { JoinFormComponent } from './join-form.component';

export const routes: Routes = [
  { 
    path: 'login', children: [
      { path: '', component: AuthenticationComponent, pathMatch: 'full' }
    ]
  }
]

@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthFormComponent,
    JoinFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule {}