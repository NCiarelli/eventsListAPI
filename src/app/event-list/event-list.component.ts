import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  noEvents: boolean = false;

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    // Call for the list of events to show on the page
    this.onSearch();
  }

  onSearch() {
    this.eventsService.getEvents().subscribe(data => {
      if ('_embedded' in data) {
        this.events = data._embedded.events;
      } else {
        this.events = [];
      }
      if (this.events.length === 0) {
        this.noEvents = true;
      } else {
        this.noEvents = false;
      }
      console.log(this.events);
    });
  }
  saveEvent(eventToSave) {
    this.eventsService.addBucketListEvent(eventToSave);
  }
}
