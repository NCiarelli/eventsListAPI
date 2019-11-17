import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SearchCriteria } from '../interfaces/search-criteria';

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


  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  }

  onSubmit():void{
    console.log(this.newSearchCriteria);
  }

}
