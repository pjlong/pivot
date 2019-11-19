import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectTeamComponent } from './containers/project-team/project-team.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'project/:id',
    children: [
      { path: 'team', component: ProjectTeamComponent },
      { path: '', component: ProjectDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
