import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PivotalAPIService } from './pivotal-api.service';
import { MeService } from './resources/me.service';
import { ProjectService } from './resources/project.service';
import { CurrentUserComponent } from './current-user/current-user.component';
import { HomeComponent } from './containers/home/home.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { EpicService } from './resources/epic.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    HomeComponent,
    ProjectDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PivotalAPIService,
    MeService,
    ProjectService,
    EpicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
