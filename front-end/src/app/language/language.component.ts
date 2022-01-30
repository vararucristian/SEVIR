import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  flag = 'us'
  language = 'en'

  constructor() { }

  ngOnInit(): void {
    this.language = localStorage && localStorage.language || 'en';
    this.setFlagByLanguage(this.language)
  }

  public languageChanged(event) : void {
    localStorage.setItem('language', event.target.value);
    window.location.reload();
  }

  private setFlagByLanguage(language:string) : void {
    switch (language) {
      case 'en':
        this.flag = 'us';
        break;
      case 'ro':
        this.flag = 'ro';
        break;
      default:
        this.flag = 'us';
        break;
    }
  }

}
