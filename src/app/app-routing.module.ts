import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeyGuardService } from './api-key-guard.service';
import { ApiKeyAuthComponent } from './components/api-key-auth/api-key-auth.component';
import { HomeComponent } from './containers/home/home.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { ProjectRootComponent } from './containers/project-root/project-root.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ApiKeyGuardService] },
  { path: 'auth', component: ApiKeyAuthComponent },
  {
    path: 'project/:id',
    component: ProjectRootComponent,
    canActivate: [ApiKeyGuardService],
    children: [
      { path: 'board', component: ProjectBoardComponent },
      { path: 'epics', component: ProjectEpicsComponent },
      { path: '', redirectTo: 'board', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
