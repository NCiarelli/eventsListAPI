import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventsService } from "../services/events.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"]
})
export class EventListComponent implements OnInit, OnDestroy {
  // Variables for event list storage
  events: any[] = [];
  noEvents: boolean = false;

  // Variables for handling pages of event listings
  private sub: Subscription;
  page: string;
  prev: string;
  next: string;
  maxPages: number;
  nextExist: boolean = false;
  tooManyResults: boolean = false;
  pageDisplay: string;

  // Variables for Bucket List handling
  eventInBucketList: boolean[] = [];
  // Empty array to hide event details
  hideEventDetails: boolean[] = [];

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Subscribe to the active route params
    this.sub = this.route.params.subscribe(params => {
      // Whenever the URL changes, this code will run. Get the "page" parameter from the params.
      // Params will always come as strings, but we want it to be like that for the HTTP request
      this.page = params.page;
      // Call for the page of events to show on the list
      this.onSearch(this.page);
      // Set up prev and next page routes
      this.prev = "/event-list/" + String(parseInt(this.page) - 1);
      // Setup string to display page +1
      this.pageDisplay = String(parseInt(this.page) + 1);
    });
  }

  ngOnDestroy() {
    // When we subscribe to the params, the component will never stop watching for updates.
    // We have to manually stop watching here when the component is destroyed.
    // Notice above that we stored the subscription reference in `this.sub`.
    this.sub.unsubscribe();
  }

  // Method to get the events list based on search criteria stored in the eventsService
  onSearch(page = "0") {
    this.eventsService.getEvents(page).subscribe(data => {
      // Once the HTTP Request returns data ...
      if ("_embedded" in data) {
        // If the returned data contains an '_embedded' property, some events fulfilled the search criteria
        // So store them in the events array
        this.events = data._embedded.events;
        // Clear the eventsInBucketList array
        this.eventInBucketList = [];
        // Then check if each is in the Bucket List and store the result in the eventInBucketList Array
        this.events.forEach((event, i) => {
          this.eventInBucketList[i] = this.eventsService.inBucketList(event.id);
        });
        // All event details are automatically set to be hidden
        this.hideEventDetails = new Array(this.events.length).fill(true);
        // console.log("hideEventDetails: ", this.hideEventDetails);

        // Code to handle next and previous page links and if the end was reached
        // console.log("Pages: ", data.page.totalPages);
        this.maxPages = data.page.totalPages;
        let nextPage = parseInt(this.page) + 1;
        // console.log("Next page: ", nextPage);
        if (this.maxPages > nextPage && nextPage < 50) {
          this.next = "/event-list/" + String(nextPage);
          this.nextExist = true;
          // console.log("Next link should exist");
        } else if (nextPage === 50) {
          this.tooManyResults = true;
        } else {
          this.nextExist = false;
        }
      } else {
        // Otherwise, just clear the events array since there are no events found
        this.events = [];
      }
      // Set or unset the noEvents flag according to if events were found or not
      if (this.events.length === 0) {
        this.noEvents = true;
      } else {
        this.noEvents = false;
      }
      // console.log(this.events);
    });
  }
  saveEvent(eventData, eventToSave, index) {
    eventData.stopPropagation();
    this.eventsService.addBucketListEvent(eventToSave);
    this.eventInBucketList[index] = true;
  }

  hideEvent(index) {
    this.hideEventDetails[index] = !this.hideEventDetails[index];
  }
}
