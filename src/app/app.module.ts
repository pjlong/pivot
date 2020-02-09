import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { environment } from '@env';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiKeyAuthComponent } from './components/api-key-auth/api-key-auth.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { FileAttachmentPreviewComponent } from './components/file-attachment-preview/file-attachment-preview.component';
import { PersonBadgeComponent } from './components/person-badge/person-badge.component';
import { ProjectNavComponent } from './components/project-nav/project-nav.component';
import { StoryCommentComponent } from './components/story-comment/story-comment.component';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { EpicDetailsComponent } from './containers/epic-details/epic-details.component';
import { HomeComponent } from './containers/home/home.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { ProjectRootComponent } from './containers/project-root/project-root.component';
import { LocalStorageService } from './local-storage.service';
import { PeopleStoreService } from './people-store.service';
import { BytesizePipe } from './pipes/bytesize.pipe';
import { ObscurePipe } from './pipes/obscure.pipe';
import { PivotalAPIService } from './pivotal-api.service';
import { MeService } from './resources/me.service';
import { EpicQuery, EpicStore, EpicService } from './store/epic';
import { ProjectQuery, ProjectStore, ProjectService } from './store/project';
import { StoryQuery, StoryStore, StoryService } from './store/story';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    HomeComponent,
    ProjectRootComponent,
    ProjectBoardComponent,
    ProjectEpicsComponent,
    ProjectNavComponent,
    StoryDetailsComponent,
    ApiKeyAuthComponent,
    ObscurePipe,
    BytesizePipe,
    StoryCommentComponent,
    FileAttachmentPreviewComponent,
    PersonBadgeComponent,
    EpicDetailsComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Third-party Modules
    AkitaNgRouterStoreModule,
    NgbModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: { sanitize: true },
      },
    }),

    // For Dev
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    PivotalAPIService,
    MeService,
    EpicQuery,
    EpicStore,
    EpicService,
    ProjectQuery,
    ProjectStore,
    ProjectService,
    StoryService,
    StoryQuery,
    StoryStore,
    PeopleStoreService,
    {
      provide: LocalStorageService,
      useFactory: (): LocalStorageService =>
        LocalStorageService.withPrefix('pivot'),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
