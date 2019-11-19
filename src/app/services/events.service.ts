import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SearchCriteria } from "../interfaces/search-criteria";

const API_KEY = "LLdgJghk51V7AYIAIQQOFooFLTMrT01s";
const TIME_APPEND = "T00:00:00Z";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  constructor(private http: HttpClient) {}

  generalEventsList: any[] = [];

  private generalSearchCriteria: SearchCriteria = {
    keyword: "",
    location: "48201",
    startDate: "2019-11-01",
    endDate: "2019-12-30",
    radius: "10"
  };

  private bucketList: any[] = [];

  private bucketListFilterCriteria: SearchCriteria = {
    keyword: "",
    location: "",
    startDate: "",
    endDate: "",
    radius: ""
  };

  getEvents(page): Observable<any> {
    return this.http.get(
      "https://app.ticketmaster.com/discovery/v2/events.json?",
      {
        params: {
          apikey: API_KEY,
          locale: "en",
          keyword: this.generalSearchCriteria.keyword,
          startDateTime: this.generalSearchCriteria.startDate + TIME_APPEND,
          endDateTime: this.generalSearchCriteria.endDate + TIME_APPEND,
          postalCode: this.generalSearchCriteria.location,
          radius: this.generalSearchCriteria.radius,
          unit: "miles",
          page: page
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

  addBucketListEvent(eventToSave): boolean {
    if (
      this.bucketList.find(event => event.id === eventToSave.id) === undefined
    ) {
      // If the event to save is not currently in the bucket list (find returns undefined)
      // Add the event to the bucket list and return true
      this.bucketList.push(eventToSave);
      // console.log("Added to Bucket List.");
      // console.log(this.bucketList);
      return true;
    } else {
      // Otherwise do not add to bucket list and return false
      return false;
    }
  }

  getBucketList(): any[] {
    return this.bucketList;
  }

  // Method to check if an event with a certain id is present in the bucket list
  inBucketList(eventId): boolean {
    if (this.bucketList.find(event => event.id === eventId) === undefined) {
      return false;
    } else {
      return true;
    }
  }

  removeBucketListEvent(event): void {
    // Find and store index of event to be removed
    let index = this.bucketList.indexOf(event);
    // Remove the event from the Bucket List
    this.bucketList.splice(index, 1);
  }

  filterBucketList(): any[] {
    console.log("BucketList filter: ", this.bucketListFilterCriteria);
    let filteredArray = this.bucketList.filter(event => {
      // console.log(
      //   this.bucketListFilterCriteria.keyword,
      //   " compared to ",
      //   event.name,
      //   " result: ",
      //   event.name.includes(this.bucketListFilterCriteria.keyword)
      // );
      return event.name
        .toLowerCase()
        .includes(this.bucketListFilterCriteria.keyword.toLowerCase());
    });
    if (this.bucketListFilterCriteria.location !== "") {
      filteredArray = filteredArray.filter(event => {
        console.log(
          this.bucketListFilterCriteria.location,
          " compared to ",
          event._embedded.venues[0].postalCode,
          " result: ",
          event._embedded.venues[0].postalCode ===
            this.bucketListFilterCriteria.location
        );
        return (
          event._embedded.venues[0].postalCode ===
          this.bucketListFilterCriteria.location
        );
      });
    }

    if (
      this.bucketListFilterCriteria.startDate !== "" &&
      this.bucketListFilterCriteria.endDate !== ""
    ) {
      filteredArray = filteredArray.filter(event => {
        console.log(
          this.bucketListFilterCriteria.startDate + TIME_APPEND,
          " to ",
          this.bucketListFilterCriteria.endDate + TIME_APPEND,
          " compared to ",
          event.dates.start.dateTime,
          " result: ",
          event.dates.start.dateTime >=
            this.bucketListFilterCriteria.startDate + TIME_APPEND &&
            event.dates.start.dateTime <=
              this.bucketListFilterCriteria.endDate + TIME_APPEND
        );
        return (
          event.dates.start.dateTime >=
            this.bucketListFilterCriteria.startDate + TIME_APPEND &&
          event.dates.start.dateTime <=
            this.bucketListFilterCriteria.endDate + TIME_APPEND
        );
      });
    }
    return filteredArray;
  }

  setfilterCriteria(newfilterCriteria: SearchCriteria): void {
    this.bucketListFilterCriteria = newfilterCriteria;
  }
}
