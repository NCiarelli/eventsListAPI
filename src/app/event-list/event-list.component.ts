import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[];
  noEvents: boolean = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    // Call for the initial list of events to show on the page
    this.eventsService
      .getEvents()
      .subscribe(data => {
        this.events = data._embedded.events;
        if(this.events.length === 0){
          this.noEvents = true;
        }
        console.log(this.events);
      });
  }
}
