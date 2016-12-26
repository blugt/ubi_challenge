import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/App.component';
import { SongComponent } from './components/song/song.component';
import { LoginFormComponent } from './components/login/login-form.component';
import { AppRoutingModule, routingComponents } from './app.routing';

import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        SongComponent,
        LoginFormComponent,
        routingComponents
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        DataService,
        AuthService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}