// An interface to specify what inputs are needed by the getEvents method of the EventsService
export interface SearchCriteria {
  keyword: string;
  location: string;
  startDate: string;
  endDate: string;
  radius: string;
}
