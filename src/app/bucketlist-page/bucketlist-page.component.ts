import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { EventsService } from "../services/events.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bucketlist-page",
  templateUrl: "./bucketlist-page.component.html",
  styleUrls: ["./bucketlist-page.component.css"]
})
export class BucketlistPageComponent implements OnInit {
  events: any[] = [];
  noEvents: boolean = true;

  hideEventDetails: boolean[] = [];

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.events = this.eventsService.getBucketList();

    // Fills hideEventDetails with true for as many
    // Events there are in the bucket list
    this.hideEventDetails = new Array(this.events.length).fill(true);
    // console.log("hideEventDetails: ", this.hideEventDetails);

    // If there are no events, trigger the flasg for it
    if (this.events.length === 0) {
      this.noEvents = true;
    } else {
      this.noEvents = false;
    }
  }

  removeEvent(eventData, event, index) {
    eventData.stopPropagation();
    this.eventsService.removeBucketListEvent(event);
    this.hideEventDetails.splice(index, 1);
  }

  hideEvent(index) {
    this.hideEventDetails[index] = !this.hideEventDetails[index];
  }

  filterList() {
    this.events = this.eventsService.filterBucketList();
    this.hideEventDetails = new Array(this.events.length).fill(true);
    // If there are no events, trigger the flasg for it
    if (this.events.length === 0) {
      this.noEvents = true;
    } else {
      this.noEvents = false;
    }
  }
}
