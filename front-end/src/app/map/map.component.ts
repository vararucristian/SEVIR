import { Component, OnInit, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { Search } from '../search.model';
import { Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';
import { Suggestion } from '../suggestion.model';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { Details } from '../details.model';


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
  suggestions: Suggestion[];
  waypoints: {location: { lat: number; lng: number; }; stopover: boolean} [];
  
  public markerOptions = {
    origin: {
      infoWindow: 'Origin.',
      icon: 'http://i.imgur.com/7teZKif.png',
    },
    waypoints: [],
    destination: {
      infoWindow: 'Destination',
      icon: 'http://i.imgur.com/7teZKif.png',
    },
  };

  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _router: Router, private cookieService: CookieService, private suggestionService: SuggestionsService) { }

  ngOnInit(): void {
    const searchData = this.cookieService.get('SearchData')
    if (searchData) {
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

        this.suggestionService.getSuggestions(this.latitude, this.longitude, this.destination.lat, this.destination.lng, this.search).subscribe(suggestions => {
          this.suggestions =  suggestions as Suggestion[];

          this.waypoints = this.suggestions.map(suggestion => {
            return {
              location: {
                lat: suggestion.latitude,
                lng: suggestion.longitude
              },
              stopover: false
            }

          });

         this.setWaypointsOptions();

        })
      });
    }
  }

  getPlaceNameByLanguage(suggestion : Suggestion) {
    return localStorage && localStorage.language === 'en' && suggestion.placeName_en? suggestion.placeName_en : suggestion.placeName;
  }

  private setWaypointsOptions() {
    this.markerOptions.waypoints = this.suggestions.map(suggestion => {
      let waypointOption = {
          infoWindow: "",
          icon: 'http://i.imgur.com/7teZKif.png',
        };
      this.suggestionService.getDetails(suggestion.latitude, suggestion.longitude, 0.05, localStorage && localStorage.language || 'en').subscribe(details => {
        let pointDetails = details as Details
        let detailsString = `
        <h5>${pointDetails.placeLabel && !pointDetails.placeLabel.startsWith('Q') ? pointDetails.placeLabel :this.getPlaceNameByLanguage(suggestion)}<h5>
          <h6>${pointDetails.placeDescription ? pointDetails.placeDescription : ""} <h6>
          <h6>${pointDetails.address ? pointDetails.address : ""} <h6>
          <h6>${pointDetails.wikidataURL ? "<a href =" + pointDetails.wikidataURL  + "> wikiData </a>" : ""} <h6>
          <h6>${pointDetails.image ? "<a href =" + pointDetails.image  + "> img </a>" : ""} <h6>

          ${pointDetails.image ? "<img src =" + pointDetails.image  + "/>" : ""} 
        `

        waypointOption.infoWindow = detailsString;


      })

      return waypointOption;
    })
    console.log(this.markerOptions)
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

  public infoWindow: InfoWindow = undefined;

  public renderOptions = {
    suppressMarkers: true,
}

}
