import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CompoundComponent } from '../components/compound.component';
import { IndexComponent } from '../components/index.component';
import { CodeService } from '../services/code.service';
import { GithubService } from '../services/github.service';
import { ServerService } from '../services/server.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent, CompoundComponent, ErrorComponent, IndexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    NzButtonModule,
    NzIconModule,
    NzListModule,
    NzTabsModule,
  ],
  providers: [CodeService, GithubService, ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
