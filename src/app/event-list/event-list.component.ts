import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: any[] = [];
  noEvents: boolean = false;

  private sub: Subscription;
  page: string;
  prev: string;
  next: string;
  maxPages: number;
  nextExist: boolean = false;
  tooManyResults: boolean = false;

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to the active route params
    this.sub = this.route.params.subscribe(params => {
      // Whenever the URL changes, this code will run. Get the "page" parameter from the params.
      // Params will always come as strings, but we want it to be like that for the HTTP request
      this.page = params.page;
      // Call for the page of events to show on the list
      this.onSearch(this.page);
      // Set up prev and next page routes
      this.prev = '/event-list/' + String(parseInt(this.page) - 1);
    });
  }

  ngOnDestroy() {
    // When we subscribe to the params, the component will never stop watching for updates.
    // We have to manually stop watching here when the component is destroyed.
    // Notice above that we stored the subscription reference in `this.sub`.
    this.sub.unsubscribe();
  }

  onSearch(page = '0') {
    this.eventsService.getEvents(page).subscribe(data => {
      if ('_embedded' in data) {
        this.events = data._embedded.events;
      } else {
        this.events = [];
      }
      if (this.events.length === 0) {
        this.noEvents = true;
      } else {
        this.noEvents = false;
        console.log('Pages: ', data.page.totalPages);
        this.maxPages = data.page.totalPages;
        let nextPage = parseInt(this.page) + 1;
        console.log('Next page: ', nextPage);
        if (this.maxPages > nextPage && nextPage < 50) {
          this.next = '/event-list/' + String(nextPage);
          this.nextExist = true;
          console.log('Next link should exist');
        } else if (nextPage === 50) {
          this.tooManyResults = true;
        } else {
          this.nextExist = false;
        }
      }
      console.log(this.events);
    });
  }
  saveEvent(eventToSave) {
    this.eventsService.addBucketListEvent(eventToSave);
  }
}
