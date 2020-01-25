import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'project/:id',
    children: [
      { path: 'board', component: ProjectBoardComponent },
      { path: 'epics', component: ProjectEpicsComponent },
      { path: '', redirectTo: 'board', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
