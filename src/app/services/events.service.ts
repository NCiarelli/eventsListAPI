import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = 'LLdgJghk51V7AYIAIQQOFooFLTMrT01s';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(
    keyword: string,
    location: string,
    startDate: any,
    endDate: any
  ): Observable<any> {
    return this.http.get(
      'https://app.ticketmaster.com/discovery/v2/events.json?',
      {
        params: {
          apikey: API_KEY,
          locale: 'en',
          keyword: keyword,
          startDateTime: startDate,
          endDateTime: endDate,
          postalCode: location
        }
      }
    );
  }
}
