import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchCriteria } from '../interfaces/search-criteria';

const API_KEY = 'LLdgJghk51V7AYIAIQQOFooFLTMrT01s';
const TIME_APPEND = 'T00:00:00Z';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {}

  generalEventsList: any[] = [];

  private generalSearchCriteria: SearchCriteria = {
    keyword: '',
    location: '48201',
    startDate: '2019-11-01',
    endDate: '2019-12-30'
  };

  private bucketList: any[] = [];

  private bucketListSearchCriteria: SearchCriteria;

  getEvents(): Observable<any> {
    return this.http.get(
      'https://app.ticketmaster.com/discovery/v2/events.json?',
      {
        params: {
          apikey: API_KEY,
          locale: 'en',
          keyword: this.generalSearchCriteria.keyword,
          startDateTime: this.generalSearchCriteria.startDate + TIME_APPEND,
          endDateTime: this.generalSearchCriteria.endDate + TIME_APPEND,
          postalCode: this.generalSearchCriteria.location
        }
      }
    );
  }

  setSearchCriteria(newSearchCriteria: SearchCriteria): void {
    this.generalSearchCriteria = newSearchCriteria;
  }

  getSearchCriteria(): SearchCriteria {
    return this.generalSearchCriteria;
  }

  addBucketListEvent(eventToSave) {
    if (
      this.bucketList.find(event => event.id === eventToSave.id) === undefined
    ) {
      // If the event to save is not currently in the bucketlist (find returns undefined)
      // Add the event to the bucketlist
      this.bucketList.push(eventToSave);
      console.log('Added to Bucket List.');
      console.log(this.bucketList);
    }
  }
}
