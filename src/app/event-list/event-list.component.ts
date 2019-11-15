import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  // events: event

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents("", "33056", "2019-11-01T00:00:00Z", "2019-12-30T00:00:00Z").subscribe(data => {
      console.log(data._embedded.events);
    });
  }

}
