import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SearchCriteria } from '../interfaces/search-criteria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {
  @Output() search = new EventEmitter<void>();

  @Input() listType: string;

  newSearchCriteria: SearchCriteria = {
    keyword: '',
    location: '',
    startDate: '',
    endDate: '',
    radius: '10'
  };

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    // Check which list type is being used
    if (this.listType === 'bucketList') {
      // If the bucketlist is up
      // get the last used bucketlist filter from the service
    } else if (this.listType === 'generalList') {
      // If the general event list is up
      // Get the general list criteria stored in the service
      this.newSearchCriteria = this.eventsService.getSearchCriteria();
    }
  }

  onSubmit(): void {
    // console.log(this.newSearchCriteria);
    // Check which type of event list is currently being used
    if (this.listType === 'bucketList') {
      // If the bucketlist is up
      // Send the filter criteria to the service for use when filtering the bucketlist events
    } else if (this.listType === 'generalList') {
      // If the general event list is up
      // Send the new search criteria to the service to be used for requests
      // to the Ticketmaster API
      this.eventsService.setSearchCriteria(this.newSearchCriteria);
      console.log(this.eventsService.getSearchCriteria());
    }
    // Emit an event to indicate that the user submitted a search
    this.search.emit();
  }
}
