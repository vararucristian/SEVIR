import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { MapsAPILoader } from '@agm/core';
import { Search } from '../search.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @ViewChild('mapSearchField') searchField: ElementRef
  faSitemap = faSitemap;
  interest_things = ["Museum", "Shop", "Amenity", "HistoricThing", "Leisure", "TourismThing", "SportThing", "PublicTransportThing", "Place"];
  stepsCompleted = [false, true, true, true]
  stepsErrors = [false, false, false, false]
  currentStep = 0;
  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private cookieService: CookieService, private _router: Router, public search: Search) { 
    search.time = 1;
    search.anyKids = false;
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchField.nativeElement, {
      });

      autocomplete.addListener('place_changed', () => {
        console.log('daaa');
        this.ngZone.run(() => {
          this.stepsCompleted[0] = false;
          this.stepsErrors[0] = false;
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          this.search.locationToGo = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          }
          
          this.stepsCompleted[0] = true;
          
        });
      });
    });
  }

  public nextPrevAction(step: number): void {
    if(step < 0) {
      this.currentStep = this.currentStep + step;
      return;
    }

    if (this.stepsCompleted[this.currentStep]) {
      this.currentStep = this.currentStep + step;
    } else {
      this.stepsErrors[0] = true;
      console.log(this.stepsErrors);
    }

  }


  public clearLocation(): void {
    this.search.locationToGo = undefined;
    this.stepsCompleted[0] = false; 
  }

  public addThing(thing:string): void {

    const index = this.search.things.indexOf(thing, 0);
    if (index > -1) {
      this.search.things.splice(index, 1);
    } else {
      this.search.things.push(thing);
    }
    if(this.search.things.length === 0) {
      this.stepsCompleted[1] = false;
    } else {
      this.stepsCompleted[1] = true;
    }

    console.log("this.search.things", this.search.things);
  }

  public setAnyKids(anyKids:boolean) : void {
    this.search.anyKids = anyKids;
    this.nextPrevAction(1);
  }

public updateSlider(event) :void {
  this.search.time = event.value;
}

public submitSearch() : void {
  this.cookieService.set('SearchData', JSON.stringify(this.search), 0.5);
  this._router.navigate(['map'])
}

}


