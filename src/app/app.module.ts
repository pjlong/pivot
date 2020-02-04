import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiKeyAuthComponent } from './components/api-key-auth/api-key-auth.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { ProjectNavComponent } from './components/project-nav/project-nav.component';
import { StoryModalContentComponent } from './components/story-modal-content/story-modal-content.component';
import { HomeComponent } from './containers/home/home.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { ProjectRootComponent } from './containers/project-root/project-root.component';
import { LocalStorageService } from './local-storage.service';
import { ObscurePipe } from './pipes/obscure.pipe';
import { PivotalAPIService } from './pivotal-api.service';
import { EpicService } from './resources/epic.service';
import { MeService } from './resources/me.service';
import { ProjectMembershipsService } from './resources/project-memberships.service';
import { ProjectService } from './resources/project.service';
import { StoriesService } from './resources/stories.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    HomeComponent,
    ProjectRootComponent,
    ProjectBoardComponent,
    ProjectEpicsComponent,
    ProjectNavComponent,
    StoryModalContentComponent,
    ApiKeyAuthComponent,
    ObscurePipe,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Third-party Modules
    NgbModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    PivotalAPIService,
    MeService,
    EpicService,
    ProjectService,
    ProjectMembershipsService,
    StoriesService,
    {
      provide: LocalStorageService,
      useFactory: (): LocalStorageService => new LocalStorageService('pivot'),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
