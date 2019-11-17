import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchCriteria } from '../interfaces/search-criteria';

const API_KEY = 'LLdgJghk51V7AYIAIQQOFooFLTMrT01s';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {}

  private generalSearchCriteria: SearchCriteria = {
    keyword:'', 
    location: '', 
    startDate: '2019-11-01T00:00:00Z', 
    endDate: '2019-12-30T00:00:00Z'
  };

  private bucketList:any[];

  private bucketListSearchCriteria: SearchCriteria;

  getEvents(): Observable<any> {
    return this.http.get(
      'https://app.ticketmaster.com/discovery/v2/events.json?',
      {
        params: {
          apikey: API_KEY,
          locale: 'en',
          keyword: this.generalSearchCriteria.keyword,
          startDateTime: this.generalSearchCriteria.startDate,
          endDateTime: this.generalSearchCriteria.endDate,
          postalCode: this.generalSearchCriteria.location
        }
      }
    );
  }

  setSearchCriteria(newSearchCriteria:SearchCriteria):void{
    this.generalSearchCriteria = newSearchCriteria;
  }
}
