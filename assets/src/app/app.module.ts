import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CompoundComponent } from '../components/compound.component';
import { IndexComponent } from '../components/index.component';
import { GithubService } from '../services/github.service';
import { UserService } from '../services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent, CompoundComponent, IndexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    NzButtonModule,
    NzDividerModule,
    NzListModule,
    NzSpaceModule,
  ],
  providers: [GithubService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
