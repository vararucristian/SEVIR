import { Component, OnInit } from '@angular/core';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  faSitemap = faSitemap;
  showedSteps = [true, false, false, false, false]

  constructor() { }

  ngOnInit(): void {
  }

}
