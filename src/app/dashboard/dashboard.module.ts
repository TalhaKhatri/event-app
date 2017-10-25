import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EventFormComponent } from './event-form.component';
import { EventListComponent } from './event-list.component';

const routes: Routes = [
  { 
    path: 'dashboard', children: [
      { path: '', component: DashboardComponent }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    EventFormComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}