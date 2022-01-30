import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-button',
  templateUrl: './survey-button.component.html',
  styleUrls: ['./survey-button.component.scss']
})
export class SurveyButtonComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  retakeSurvey() {
    this._router.navigate([''])
  }
}
