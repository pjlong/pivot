import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PivotalAPIService } from './pivotal-api.service';
import { MeService } from './resources/me.service';
import { ProjectService } from './resources/project.service';
import { CurrentUserComponent } from './current-user/current-user.component';
import { HomeComponent } from './containers/home/home.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { EpicService } from './resources/epic.service';
import { ProjectTeamComponent } from './containers/project-team/project-team.component';
import { ProjectMembershipsService } from './resources/project-memberships.service';
import { CardComponent } from './bootstrap/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    HomeComponent,
    ProjectDashboardComponent,
    ProjectTeamComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    PivotalAPIService,
    MeService,
    ProjectService,
    EpicService,
    ProjectMembershipsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
