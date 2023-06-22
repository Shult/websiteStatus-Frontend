import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WebsiteComponent } from './components/website.component';
import { WebsiteService } from './services/website.service';
import {HelpButtonComponent} from "./help-button/help-button.component";


@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    HelpButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [WebsiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
