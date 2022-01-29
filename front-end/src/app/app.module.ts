import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNlQDgXFpTdTsvicmpfvccKchYWinJMXc'
    }),
    FontAwesomeModule
  ],
  providers: [],
  declarations: [ AppComponent, MapComponent, SurveyComponent ],
  bootstrap: [ AppComponent, MapComponent ]
})
export class AppModule {}