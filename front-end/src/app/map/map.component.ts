import { Component, OnInit, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { Search } from '../search.model';
import { Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  search: Search;
  private geoCoder;
  origin: { lat: number; lng: number; };
  destination: { lat: number; lng: number; };


  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _router: Router, private cookieService: CookieService, private suggestionService: SuggestionsService) { }

  ngOnInit(): void {
    const searchData = this.cookieService.get('SearchData')
    if (searchData) {
      console.log(searchData);
      this.search = JSON.parse(searchData);
      this.destination = {
        lat: this.search.locationToGo.latitude,
        lng: this.search.locationToGo.longitude
      }
    }
    else {
      this._router.navigate([''])
    }

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      console.log(this.origin);
      console.log(this.destination)
    });
    
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.origin = { lat: this.latitude, lng: this.longitude };
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);

        this.suggestionService.getSuggestions(this.latitude, this.longitude, this.destination.lat, this.destination.lng, this.search.things[0]).subscribe(suggsetions => {
          console.log("suggestions", suggsetions);
        })
      });
    }
  }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

  }

}
