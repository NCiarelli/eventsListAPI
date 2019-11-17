import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SearchCriteria } from '../interfaces/search-criteria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  newSearchCriteria: SearchCriteria ={
    keyword:'', 
    location: '', 
    startDate: '', 
    endDate: ''
  }


  constructor(private eventsService: EventsService, private router:Router) { }

  ngOnInit() {
    this.newSearchCriteria = this.eventsService.getSearchCriteria();
  }

  onSubmit():void{
    // console.log(this.newSearchCriteria);
    this.eventsService.setSearchCriteria(this.newSearchCriteria);
    console.log(this.eventsService.getSearchCriteria());
    this.router.navigate(["event-list"]);
  }

}
