import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './bootstrap/card/card.component';
import { ProjectNavComponent } from './components/project-nav/project-nav.component';
import { StoryModalContentComponent } from './components/story-modal-content/story-modal-content.component';
import { HomeComponent } from './containers/home/home.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { PivotalAPIService } from './pivotal-api.service';
import { EpicService } from './resources/epic.service';
import { MeService } from './resources/me.service';
import { ProjectMembershipsService } from './resources/project-memberships.service';
import { ProjectService } from './resources/project.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    HomeComponent,
    ProjectDashboardComponent,
    ProjectBoardComponent,
    CardComponent,
    ProjectEpicsComponent,
    ProjectNavComponent,
    StoryModalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    PivotalAPIService,
    MeService,
    ProjectService,
    EpicService,
    ProjectMembershipsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
