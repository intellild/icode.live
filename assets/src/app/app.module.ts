import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CompoundComponent } from '../components/compound.component';
import { IndexComponent } from '../components/index.component';
import { CodeService } from '../services/code.service';
import { ConnectionService } from '../services/connection.service';
import { GithubService } from '../services/github.service';
import { NavigationService } from '../services/navigation.service';

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
    NzInputModule,
    NzListModule,
    NzTabsModule,
    FormsModule,
  ],
  providers: [CodeService, GithubService, ConnectionService, NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
