import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WebsiteComponent } from './components/website.component';
import { WebsiteService } from './services/website.service';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent
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
