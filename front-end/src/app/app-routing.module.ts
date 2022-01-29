import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { SurveyComponent } from './survey/survey.component';


const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'survey', component: SurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
