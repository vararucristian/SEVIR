import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private http: HttpClient) { }


  public getSuggestions(lat1: number, long1: number, lat2: number, long2: number, interest: string) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('access-control-allow-origin', '*');

    const options = {
      headers: headers
    }

    console.log('search', lat1, long1, lat2, long2, interest);
    console.log(`http://127.0.0.1:5000/getSuggestions/?lat1=${lat1}&&long1=${long1}&&lat2=${lat2}&&long2=${long2}&&interest=${interest}`);

    return this.http.get(`http://127.0.0.1:5000/getSuggestions/?lat1=${lat1}&&long1=${long1}&&lat2=${lat2}&&long2=${long2}&&interest=${interest}`, options);
  }

}
