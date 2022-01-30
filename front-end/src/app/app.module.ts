import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SurveyComponent } from './survey/survey.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Search } from './search.model';
import { LanguageComponent } from './language/language.component';

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
      language: localStorage && localStorage.language || 'en'
    }),
    AgmDirectionModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [Search],
  declarations: [ AppComponent, MapComponent, SurveyComponent, LanguageComponent ],
  bootstrap: [ AppComponent, MapComponent ]
})
export class AppModule {}