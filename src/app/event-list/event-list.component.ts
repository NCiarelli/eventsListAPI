import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: any[] = [];
  noEvents: boolean = false;

  // For catching when trying to route to the page even if there already
  navigationSubscription;

  constructor(private eventsService: EventsService, private router:Router) {
    // Part of trying to get the page to reload on routing to it
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    // Call for the list of events to show on the page
    this.eventsService
      .getEvents()
      .subscribe(data => {
        if("_embedded" in data){
          this.events = data._embedded.events;
        }
        if(this.events.length === 0){
          this.noEvents = true;
        }
        console.log(this.events);
      });
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    // Call for the list of events to show on the page
    this.eventsService
      .getEvents()
      .subscribe(data => {
        if("_embedded" in data){
          this.events = data._embedded.events;
        }
        if(this.events.length === 0){
          this.noEvents = true;
        }
        console.log(this.events);
      });
  }
  
  ngOnDestroy() {
     // avoid memory leaks here by cleaning up after ourselves. If we  
     // don't then we will continue to run our initialiseInvites()   
     // method on every navigationEnd event.
     if (this.navigationSubscription) {  
        this.navigationSubscription.unsubscribe();
     }
  }
}
