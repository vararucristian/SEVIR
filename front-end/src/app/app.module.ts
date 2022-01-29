import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'; 

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SurveyComponent } from './survey/survey.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Search } from './search.model';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: SurveyComponent },
      { path: 'map', component: MapComponent },
    ]),
    MatSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNlQDgXFpTdTsvicmpfvccKchYWinJMXc',
      libraries: ['places'],
      language: 'ro'
    }),
    AgmDirectionModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [Search],
  declarations: [ AppComponent, MapComponent, SurveyComponent ],
  bootstrap: [ AppComponent, MapComponent ]
})
export class AppModule {}