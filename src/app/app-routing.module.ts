import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'project/:id',
    children: [
      { path: 'board', component: ProjectBoardComponent },
      { path: '', component: ProjectDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
