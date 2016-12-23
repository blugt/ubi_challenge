import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/App.component';
import { AppRoutingModule, routingComponents } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        routingComponents
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}