import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.eventsService
      .getEvents('', '', '2019-11-01T00:00:00Z', '2019-12-30T00:00:00Z')
      .subscribe(data => {
        this.events = data._embedded.events;
        console.log(this.events);
      });
  }
}
