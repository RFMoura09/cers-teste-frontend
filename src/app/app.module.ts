import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessagesService } from './services/messages.service';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [MessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
