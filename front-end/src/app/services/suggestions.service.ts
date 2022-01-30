import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from '../search.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders()
    .set('content-type', 'application/json')
    .set('access-control-allow-origin', '*')
  }


  public getSuggestions(lat1: number, long1: number, lat2: number, long2: number, search: Search) {
    
    let searchString =`http://127.0.0.1:5000/getSuggestions/?lat1=${lat1}&long1=${long1}&lat2=${lat2}&long2=${long2}&hours=${search.time}`;
    search.things.forEach(interest => {
      searchString = searchString.concat(`&interest=${interest}`);
    })

    return this.http.get(searchString, this.options);
  }

  public getDetails(lat, long, radius, language) {
    let detailSearchString = `http://127.0.0.1:5000/getDetails/?lat=${lat}&long=${long}&dist=${radius}&lang=${language}`

    return this.http.get(detailSearchString, this.options);
  }

}
