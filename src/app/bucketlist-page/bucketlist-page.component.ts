import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucketlist-page',
  templateUrl: './bucketlist-page.component.html',
  styleUrls: ['./bucketlist-page.component.css']
})
export class BucketlistPageComponent implements OnInit {
  events: any[] = [];

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.events = this.eventsService.getBucketList();
  }

  removeEvent(event) {
    this.eventsService.removeBucketListEvent(event);
  }
}
