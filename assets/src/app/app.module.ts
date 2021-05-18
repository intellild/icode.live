import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbCardModule, NbDialogModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { IndexComponent } from '../components/index.component';
import { UserService } from '../services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbButtonModule,
    NbCardModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbDialogModule.forRoot({}),
    NbLayoutModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
